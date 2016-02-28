var tip = document.getElementById('tip');
var button = document.getElementById('button');

button.setAttribute('role', 'button');
button.setAttribute('tabindex', '0');
button.setAttribute('aria-expanded', 'false');
button.setAttribute('aria-describedby', 'tip');
tip.setAttribute('hidden', true);

function toggleTip(e) {

    if (tip.hasAttribute('hidden')) {
        button.setAttribute('aria-expanded', 'true');
        tip.innerHTML = " <span role='tooltip' aria-live='polite'>Tequila         (makes me happy)!</span>";
        tip.setAttribute('role', 'complementary');
        tip.removeAttribute('hidden');
    } else {
        button.setAttribute('aria-expanded', 'false');
        tip.innerHTML = '';
        tip.removeAttribute('role');
        tip.setAttribute('hidden', true);
    }
}

button.addEventListener('click', toggleTip, false);

button.addEventListener('keydown', function(e) {

    if (e.keyCode == 13 || e.keycode == 32) {
        toggleTip();
    }
});

document.addEventListener('keyup', function(e) {

    if (e.keyCode == 27) {
        toggleTip();
    }
});
