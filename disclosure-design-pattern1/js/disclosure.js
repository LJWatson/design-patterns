function toggleContent()
{
	var button = document.getElementById("button");
	var content = document.getElementById("content");

    if(content.getAttribute("aria-hidden") == "true")
	{
		content.setAttribute("aria-hidden", "false");
		button.setAttribute("aria-expanded", "true");
	}
	else
	{
		content.setAttribute("aria-hidden", "true");
		button.setAttribute("aria-expanded", "false");
	}
}

window.onload = init;