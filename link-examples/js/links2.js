function fetchResource2(event)
{
	window.location.href = 'http://w3.org/';
}

// Check if the enter (key code 13) has been pressed
function handleLinkKeyUp(event)
{
	event = event || window.event;
	
	if (event.keyCode === 13)
	{
		fetchResource2(event);
	}
}

window.onload = init;