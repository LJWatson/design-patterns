function toggleContent(event)
{
	var button = document.getElementById("button");
	var content = document.getElementById("content");

	if(button.getAttribute("aria-expanded") == "false")
	{
		button.setAttribute("aria-expanded", "true");
	}
	else
	{
		button.setAttribute("aria-expanded", "false");
	}

    if(content.getAttribute("aria-hidden") == "true")
	{
		content.setAttribute("aria-hidden", "false");
	}
	else
	{
		content.setAttribute("aria-hidden", "true");
	}
}

// Check if the Space (key code 32) or enter (key code 13) have been pressed
function handleBtnKeyUp(event)
{
	event = event || window.event;
	
	if ((event.keyCode === 32) || (event.keyCode === 13))
	{
		toggleContent(event);
	}
}

window.onload = init;