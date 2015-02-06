function init()
{
	document.getElementById("button").addEventListener("click", toggleButton);
	document.getElementById("button").addEventListener("keydown", toggleButton);
}

function toggleButton(event)
{
	var button = document.getElementById("button");
	var type = event.type;
	
	if (type === 'keydown' && (event.keyCode !== 13 && event.keyCode !== 32))
	{
		return true
	}

	if(button.getAttribute("aria-pressed") == "false")
	{
		button.setAttribute("aria-pressed", "true");
	}
	else
	{
		button.setAttribute("aria-pressed", "false");
	}

	event.preventDefault();
}

window.onload = init;