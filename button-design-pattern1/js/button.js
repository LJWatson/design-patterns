function toggleButton(event)
{
	var button = document.getElementById("button");

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