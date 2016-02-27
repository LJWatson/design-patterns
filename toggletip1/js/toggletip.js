	var tip = document.getElementById('tip');
	var button = document.getElementById('button');

	button.setAttribute('aria-expanded', 'false');
	button.setAttribute('aria-describedby', 'tip');

	function showTip() {
	    button.setAttribute('aria-expanded', 'true');

	    tip.innerHTML = " <span role='tooltip' aria-live='polite'>Tequila         (makes me happy)!</span>";
	    tip.setAttribute("style", "display: block;");
	}

	function hideTip() {
	    button.setAttribute('aria-expanded', 'false');

	    tip.innerHTML = '';
	    tip.setAttribute('style', 'display: none;');
	}

	function toggleTip(e) {

	    if (window.getComputedStyle(tip).getPropertyValue('display')=== 'none') {
    	        showTip();
	    } else {
    	        hideTip();
	    }
	}

	button.addEventListener('click', toggleTip, false);

	document.addEventListener('keyup', function(e) {

	    if (e.keyCode == 27) {
    	        toggleTip();
	    }
	});