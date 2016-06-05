(function () {
    'use strict';
    
    var button = document.getElementById('button');
    var icon = document.getElementById('icon');
    var content = document.getElementById('content');

    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', 0);
    button.setAttribute('aria-expanded', 'false');
    icon.setAttribute('aria-hidden', 'true');
    content.setAttribute('hidden', 'true');

    function disclose(event) {        
        if (content.hasAttribute('hidden')) {
            button.setAttribute('aria-expanded', 'true');
            button.setAttribute('aria-controls', 'content'); 
            content.removeAttribute('hidden');
        }
        else {
            button.setAttribute('aria-expanded', 'false');
            content.setAttribute('hidden', 'true');
            button.removeAttribute('aria-controls');
        }
    }

    button.addEventListener('click', disclose, false);

	button.addEventListener('keydown', function(event) {
        if (event.keyCode == 13 || event.keyCode ==32) {
            disclose();
        }
	});

})();
