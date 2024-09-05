/**
 * Smoothly scrolls the page to the header section.
 *
 * This function targets an element with the ID 'menu' and scrolls the window to that element's position on the page.
 * The scrolling behavior is set to be smooth.
 */
export function scrollHeader() {
	/** @type {HTMLElement | null} */
	const targetElement = document.getElementById('menu');

	if (targetElement) {
		window.scrollTo({
			top: targetElement.offsetTop,
			behavior: 'smooth',
		});
	}
}
