(function () {
    'use strict';
    
    var button = document.getElementById('button');
    button.setAttribute('aria-pressed', 'false');
    
    function toggle(event) {        
        if (button.getAttribute('aria-pressed') == 'false') {
            button.setAttribute('aria-pressed', 'true');
        }
        else {
            button.setAttribute('aria-pressed', 'false');
        }
    }

    button.addEventListener('click', toggle, false);

})();

