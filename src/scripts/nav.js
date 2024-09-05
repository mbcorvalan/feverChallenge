/**
 * Selects the mobile navigation menu element from the DOM.
 * @type {HTMLElement}
 */
const menu = document.querySelector('.nav__content--mobile');

/**
 * Opens the mobile navigation menu by adding the 'open' class
 * and removing the 'close' class.
 */
export function openMobileNav() {
	menu.classList.add('open');
	menu.classList.remove('close');
}

/**
 * Closes the mobile navigation menu by adding the 'close' class
 * and removing the 'open' class.
 */
export function closeMobileNav() {
	menu.classList.add('close');
	menu.classList.remove('open');
}

/**
 * Adds an event listener to the document that closes the mobile
 * navigation menu when a click occurs outside of the menu and
 * the menu toggle button.
 */
document.addEventListener('click', function (event) {
	if (!menu.contains(event.target) && !event.target.closest('.menu-burger')) {
		closeMobileNav();
	}
});

window.addEventListener('DOMContentLoaded', () => {
	closeMobileNav();
});
