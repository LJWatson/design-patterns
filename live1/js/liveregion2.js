var items = 0;

function init()
{	
	document.getElementById("button").addEventListener("click", updateItems);
}

function updateItems(event)
{
	items = items + 1;
	document.getElementById("quantity").innerHTML=items;
}

window.onload = init;