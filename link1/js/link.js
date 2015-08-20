(function ()
{

	function makeLinks ()
	{
		//Put JS into strict mode.
		'use strict';
		
		// Add foreach capability.
		if (typeof NodeList.prototype.forEach === 'undefined')
		{
			NodeList.prototype.forEach = Array.prototype.forEach;
		}
		
		// Get all elements with data-arialink attribute.
		var links = document.querySelectorAll('[data-arialink]');
		
		var fetchResource =  function (e)
		{
			
			//Listen for keydown events and capture the senter key.
			if (e.type === "keydown" && e.keyCode !== 13) 
			{
				return false;
			}
			
			e.preventDefault();
			
			window.location.href = e.target.dataset.arialink;
		};

		//Iterate through links to add a11y and interaction support.
		links.forEach(function (link)
		{
			link.tabIndex = '0';
			link.setAttribute('role', 'link');
			link.addEventListener("click", fetchResource);
			link.addEventListener("keydown", fetchResource);
		});
	}
	
	document.addEventListener('DOMContentLoaded', function ()
	{
		makeLinks();
	});
})();