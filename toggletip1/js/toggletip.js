(function () {

	var button = document.getElementById('button');
	var tip = document.getElementById('tip');
	var content = document.getElementById('content');

	button.setAttribute('aria-expanded', 'false');
	button.setAttribute('aria-describedby', 'tip');

	tip.setAttribute('hidden', true);

	content.setAttribute('role', 'tooltip');
	content.setAttribute('aria-live', 'polite');

	function toggleTip(e) {

	  if (tip.hasAttribute('hidden')) {
	    button.setAttribute('aria-expanded', 'true');
	    content.innerHTML = "Tequila         (makes me happy)!";
	    tip.removeAttribute('hidden');
		} else {
	    button.setAttribute('aria-expanded', 'false');
	    content.innerHTML = '';
	    tip.setAttribute('hidden', true);
		}
	}

	button.addEventListener('click', toggleTip, false);

	document.addEventListener('keydown', function(e) {

	  if (e.keyCode == 27) {
	    toggleTip();
	  }
	});

})();
