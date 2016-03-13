(function () {
    'use strict';

	function tabPanel () {

		function init () {
			var tabLists = nodelistToArray(document.querySelectorAll('[data-aria-tabpanel]'));

			tabLists.forEach(function (tabList) {
				var listItems = nodelistToArray(tabList.querySelectorAll('li')),
					tabs = nodelistToArray(tabList.querySelectorAll('a'));

				tabList.setAttribute('role', 'tablist');

				listItems.forEach(function (listItem) {
					listItem.setAttribute('role', 'presentation');
				});

				tabs.forEach(function (tab, index) {
					var tabIndex,
						ariaSelected,
						tabPanelId,
						tabPanel,
						tabPanelHidden;

					tab.setAttribute('role', 'tab');

					if (index === 0) {
						tabIndex = '0';
						ariaSelected = 'true';
						tabPanelHidden = false;
					}
					else {
						tabIndex = '-1';
						ariaSelected = 'false';
						tabPanelHidden = true;
					}

					tab.setAttribute('tabindex', tabIndex);
					tab.setAttribute('aria-selected', ariaSelected);

					tabPanelId = tab.getAttribute('href').substring(1);

					tabPanel = document.getElementById(tabPanelId);

					tab.setAttribute('aria-controls', tabPanelId);

					// tabPanel.setAttribute('aria-labelledby', tab.getAttribute('id'));
					tabPanel.setAttribute('role', 'tabpanel');
					tabPanel.setAttribute('tabindex', '-1');

					if (tabPanelHidden) {
						tabPanel.setAttribute('hidden', true);
					}

					tab.addEventListener('click', function (e) {
						handleClick(e, tabList, tabs);
					});
				});

				tabList.addEventListener('keydown', function (e) {
					handleKeyboard(e, tabList, tabs);
				});
			});
		}

		function handleClick (e, tabList, tabs) {
			var selectedTab = tabList.querySelector('[aria-selected=true]'),
				newTab = e.target;

			if (e.target !== selectedTab) {
				tabs.forEach(function (tab) {
					var tabIndex,
						ariaSelected,
						tabPanelId,
						tabPanel,
						tabPanelHidden;

					if (tab === newTab) {
						tabIndex = '0';
						ariaSelected = 'true';
						tabPanelHidden = false;
					}
					else {
						tabIndex = '-1';
						ariaSelected = 'false';
						tabPanelHidden = true;
					}

					tab.setAttribute('tabindex', tabIndex);
					tab.setAttribute('aria-selected', ariaSelected);

					tabPanelId = tab.getAttribute('href').substring(1);

					tabPanel = document.getElementById(tabPanelId);

					if (tabPanelHidden) {
						tabPanel.setAttribute('hidden', true);
					}
					else {
						tabPanel.removeAttribute('hidden');
					}
				});
			}

			e.preventDefault();
		}

		function handleKeyboard (e, tabList, tabs) {
			var keyCode = {
					DOWN: 40,
					LEFT: 37,
					RIGHT: 39,
					UP: 38
				},
				selectedTab = tabList.querySelector('[aria-selected=true]'),
				tabsLength = tabs.length,
				nextTabIndex;

			switch (e.keyCode) {
				case keyCode.UP:
				case keyCode.LEFT:
					tabs.forEach(function (tab, index) {
						if (tab === selectedTab) {
							if (index === 0) {
								nextTabIndex = tabsLength - 1;
							}
							else {
								nextTabIndex = index - 1;
							}
						}
					});
				break;

				case keyCode.RIGHT:
				case keyCode.DOWN:
					tabs.forEach(function (tab, index) {
						if (tab === selectedTab) {
							if (index + 1 === tabsLength) {
								nextTabIndex = 0;
							}
							else {
								nextTabIndex = index + 1;
							}
						}
					});
				break;
			}

			if (nextTabIndex !== undefined) {
				tabs.forEach(function (tab, index) {
					var tabIndex,
						ariaSelected,
						tabPanelId,
						tabPanel,
						tabPanelHidden;

					if (index === nextTabIndex) {
						tabIndex = '0';
						ariaSelected = 'true';
						tabPanelHidden = false;
						tab.focus();
					}
					else {
						tabIndex = '-1';
						ariaSelected = 'false';
						tabPanelHidden = true;
					}

					tab.setAttribute('tabindex', tabIndex);
					tab.setAttribute('aria-selected', ariaSelected);

					tabPanelId = tab.getAttribute('href').substring(1);

					tabPanel = document.getElementById(tabPanelId);

					if (tabPanelHidden) {
						tabPanel.setAttribute('hidden', true);
					}
					else {
						tabPanel.removeAttribute('hidden');
					}
				});
			}
		}

		init();
	}

	document.addEventListener('DOMContentLoaded', function () {
        tabPanel();
	});

	function nodelistToArray (nodelistObj) {
		var arrayObj = [];
		for(var i = nodelistObj.length; i--; arrayObj.unshift(nodelistObj[i]));
		return arrayObj;
	}

})();