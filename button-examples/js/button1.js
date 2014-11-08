function toggleButton1(event)
{
	var button = document.getElementById("button1");
	
	if(button.getAttribute("class") == "default")
	{
		button.setAttribute("class", "pressed");
	}
	else
	{
		button.setAttribute("class", "default");
	}
}

window.onload = init;