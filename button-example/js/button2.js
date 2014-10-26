function toggleButton2(event)
{
	var button = document.getElementById("button2");
	
	if(button.getAttribute("aria-pressed") == "false")
	{
		button.setAttribute("aria-pressed", "true");
	}
	else
	{
		button.setAttribute("aria-pressed", "false");
	}
}

// Check if the Space (key code 32) or enter (key code 13) have been pressed
function handleBtnKeyUp(event)
{
	event = event || window.event;
	
	if ((event.keyCode === 32) || (event.keyCode === 13))
	{
		toggleButton2(event);
	}
}

window.onload = init;