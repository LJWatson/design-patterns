(function () {
'use strict';

function makeLinks () {

if (typeof NodeList.prototype.forEach === 'undefined') {
NodeList.prototype.forEach = Array.prototype.forEach;
}

var links = document.querySelectorAll('[data-link]');

var fetchResource =  function (e) {

if (e.type === "keydown" && e.keyCode !== 13) {
return false;
}

e.preventDefault();

window.location.href = e.target.dataset.link;
};

links.forEach(function (link) {
link.tabIndex = '0';
link.setAttribute('role', 'link');
link.addEventListener("click", fetchResource);
link.addEventListener("keydown", fetchResource);
});
}

document.addEventListener('DOMContentLoaded', function () {
makeLinks();
});
})();
