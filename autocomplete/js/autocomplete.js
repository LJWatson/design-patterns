function selectItem(objAutocomplete, objCurrent, objNext) {
	if (objNext) {
		$(objCurrent).removeClass('focused');
		$(objNext).addClass('focused');
		$(objAutocomplete).attr('aria-activedescendant', $(objNext).attr('id'));
		$(objAutocomplete).val($(objNext).text());
		$(objNext).focus();
	}
}

function displayMenu(objAutocomplete, bEmpty) {
	var strSearch = $(objAutocomplete).attr('data-typed').replace(/^\s*|\s*$/g, '').toLowerCase();
	var iVisible = 0;

	if (bEmpty || strSearch.length > 0) {
		$('#suggestions').find('li').each(function() {
			if ($(this).text().toLowerCase().indexOf(strSearch) < 0) {
				$(this).hide();
			}
			else {
				$(this).show();
				iVisible++;
			}
		});
	}

	return iVisible;
}

function showMenu(objAutocomplete, objEvent) {
	var iVisible;

	$(objAutocomplete).attr('data-typed', '');
	iVisible = displayMenu(objAutocomplete, true);

	if ($(objEvent.target).attr('class') === 'icon-expand') {
		if (iVisible && $('#suggestions').css('display') === 'none') {
			$('#suggestions').show();
			$(objAutocomplete).attr('aria-expanded', 'true');
		}
		else {
			$('#suggestions').hide();
			$(objAutocomplete).attr('aria-expanded', 'false');
		}
	}
	else {
		$('#suggestions').hide();
		$(objAutocomplete).attr('aria-expanded', 'false');
	}
}

function select(objItem, objEvent) {
	var objTarget = objEvent.target;

	$('#ac').val($(objTarget).text());
	$('#ac').attr('aria-expanded', 'false').attr('data-selected', $('#ac').val());
	$('#suggestions').find('li').removeClass('focused');
	$(objTarget).addClass('focused');
	$('#ac').attr('aria-activedescendant', $(objTarget).attr('id'));
	$('#suggestions').hide();
}

function suggest(objAutocomplete, objEvent) {
	var objCurrent, objNext, iVisible, iIndex, bDisplay = true;
	if ($(objAutocomplete).attr('aria-activedescendant')) {
		objCurrent = $('#suggestions').find('li#' + $(objAutocomplete).attr('aria-activedescendant'));
	}

	switch (objEvent.keyCode) {
		case 9: // TAB
			if ($(objAutocomplete).attr('data-selected').length > 0) {
				$(objAutocomplete).val($(objAutocomplete).attr('data-selected'));
			}
			else {
				$(objAutocomplete).val($(objAutocomplete).attr('data-typed'));
			}
			$('#suggestions').hide();
			$(objAutocomplete).select();
			bDisplay = false;
			break;
		case 16: // SHIFT
			return false;
		case 13: // ENTER
		case 32: // SPACE
			$(objAutocomplete).attr('data-selected', $(objAutocomplete).val());
			$('#suggestions').hide();
			bDisplay = false;
			if ($(objEvent.target).prop('tagName') === 'LI') {
				$(objAutocomplete).focus();
			}
			objEvent.preventDefault();
			break;
		case 27: // ESCAPE
			if ($(objAutocomplete).attr('data-selected').length > 0) {
				$(objAutocomplete).val($(objAutocomplete).attr('data-selected'));
			}
			else {
				$(objAutocomplete).val($(objAutocomplete).attr('data-typed'));
			}
			$(objAutocomplete).attr('aria-activedescendant', '');
			$('#suggestions').find('li').removeClass('focused');
			$('#suggestions').hide();
			bDisplay = false;
			if ($(objEvent.target).prop('tagName') === 'LI') {
				$(objAutocomplete).focus();
			}
			objEvent.preventDefault();
			break;
		case 38: //UP
		if ($('#suggestions').css('display') === 'block') {
				if ($(objAutocomplete).attr('data-typed').length > 0) {
					iVisible = displayMenu(objAutocomplete, false);
				}
				else {
					iVisible = displayMenu(objAutocomplete, true);
				}
				if (iVisible > 0 ) {
					if (!$(objAutocomplete).attr('aria-activedescendant')) {
						objNext = $('#suggestions').find('li:visible:last');
					}
					else {
						iIndex = parseInt($('#suggestions').find('li:visible').index(objCurrent), 10) - 1;
						if (iIndex >= 0) {
							objNext = $('#suggestions').find('li:visible').get(iIndex);
						}
						else {
							objNext = $('#suggestions').find('li:visible:last');
						}
					}
					selectItem(objAutocomplete, objCurrent, objNext);
				}
			}

			objEvent.preventDefault();
			break;
		case 40: //DOWN
			if ($(objAutocomplete).attr('data-typed').length > 0) {
				iVisible = displayMenu(objAutocomplete, false);
			}
			else {
				iVisible = displayMenu(objAutocomplete, true);
			}
			if (iVisible > 0 ) {
				if (!$(objAutocomplete).attr('aria-activedescendant')) {
					objNext = $('#suggestions').find('li:visible')[0];
				}
				else {
					iIndex = parseInt($('#suggestions').find('li:visible').index(objCurrent), 10) + 1;
					if (iIndex < $('#suggestions').find('li:visible').length) {
						objNext = $('#suggestions').find('li:visible').get(iIndex);
					}
					else {
						objNext = $('#suggestions').find('li:visible')[0];
					}
				}
				selectItem(objAutocomplete, objCurrent, objNext);
			}

			objEvent.preventDefault();
			break;
		default:
			if ($(objEvent.target).prop('tagName') === 'LI') {
				$(objAutocomplete).focus();
			}
			$(objAutocomplete).attr('data-typed', $(objAutocomplete).val());
			iVisible = displayMenu(objAutocomplete, false);
			if (iVisible > 0) {
				$('#feedback').html(iVisible + ' results are available');
			}
			else {
				$('#feedback').html('No search results');
			}
			setTimeout(function(){$('#feedback').html('');}, 1000);
	}

	if (bDisplay && iVisible) {
		$('#suggestions').show();
		$(objAutocomplete).attr('aria-expanded', 'true');
	}
	else {
		$('#suggestions').hide();
		$(objAutocomplete).attr('aria-expanded', 'false');
	}

	return false;
}

function loadMenu(arLanguages) {
	var objList = $('<ul id="suggestions" role="listbox"></ul>');
	var iPos = $('#ac').offset();
	var iWidth = $('#ac').width();

	$.each(arLanguages, function(iKey, strValue) {
		objList.append('<li tabindex="-1" role="option" id="search' + iKey + '">' + strValue + '</li>');
	});

	$(objList).insertAfter($('#ac').next());
	$(objList).click(function(event){select(this, event);});
	$(objList).css({'left': iPos.left + 2, 'top': iPos.top + 6, 'width': iWidth});
	$(objList).keydown(function(event){suggest($('#ac'), event);});
}

$(document).ready(function() {
	var objAutocomplete = $('#ac');
	var arLanguages = [
		'ActionScript',
		'AppleScript',
		'Asp',
		'BASIC',
		'C',
		'C++',
		'Clojure',
		'COBOL',
		'ColdFusion',
		'Erlang',
		'Fortran',
		'Groovy',
		'Haskell',
		'Java',
		'JavaScript',
		'Lisp',
		'Perl',
		'PHP',
		'Python',
		'Ruby',
		'Scala',
		'Scheme'];

	objAutocomplete.attr('role', 'combobox')
				   .attr('aria-autocomplete', 'list')
				   .attr('aria-expanded', 'false')
				   .attr('aria-owns', 'suggestions')
				   .attr('aria-labelledby', $(objAutocomplete).prev().attr('id'))
				   .attr('data-typed', '')
				   .attr('data-selected', '')
				   .parent().append('<span class="icon-expand" aria-hidden="true"></span>');
	$('body').click(function(event){showMenu($('#ac'), event);});
	$('body').append('<div role="status" aria-live="polite" id="feedback" class="context"></div>');
	objAutocomplete.keyup(function(event){suggest(this, event);});
	loadMenu(arLanguages);
});