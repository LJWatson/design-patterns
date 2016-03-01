(function () {

	var tip = document.getElementById('tip');
	var button = document.getElementById('button');
	var content = document.getElementById('content');

	button.setAttribute('role', 'button');
	button.setAttribute('tabindex', '0');
	button.setAttribute('aria-expanded', 'false');
	button.setAttribute('aria-describedby', 'tip');

	tip.setAttribute('role', 'complementary');
	tip.setAttribute('hidden', true);

	content.setAttribute('role', 'tooltip');
	content.setAttribute('aria-live', 'polite');

	function toggleTip(e) {

    if (tip.hasAttribute('hidden')) {
      button.setAttribute('aria-expanded', 'true');
      content.innerHTML = "Makes me happy!";
      tip.removeAttribute('hidden');
  	} else {
	    button.setAttribute('aria-expanded', 'false');
		  content.innerHTML = '';
		  tip.setAttribute('hidden', true);
	  }
	}

	button.addEventListener('click', toggleTip, false);

	button.addEventListener('keydown', function(e) {

	  if (e.keyCode == 13 || e.keycode == 32) {
	    toggleTip();
	  }
	});

	document.addEventListener('keydown', function(e) {

	  if (e.keyCode == 27) {
	    toggleTip();
	  }
	});

})();
