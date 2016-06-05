(function () {
'use strict';

document.getElementById("button").addEventListener("click", updateItems);

var items = 0;

function updateItems (e) {
items = items + 1;
document.getElementById("quantity").innerHTML=items;
}
})();