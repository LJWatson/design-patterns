function init()
{
	document.getElementById("button").addEventListener("click", toggleButton);
}

function toggleButton(event)
{
	var button = document.getElementById("button");
	
	if(button.getAttribute("aria-pressed") == "false")
	{
		button.setAttribute("aria-pressed", "true");
	}
	else
	{
		button.setAttribute("aria-pressed", "false");
	}
}

window.onload = init;