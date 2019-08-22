(function () {
'use strict';

document.getElementById("button").addEventListener("click", updateLiveRegion);

function updateLiveRegion (e) {
var update = document.getElementById("update");
update.innerHTML = "";
setTimeout(function(){ update.innerHTML = "Successfully updated!";}, 100);
}
}	)();