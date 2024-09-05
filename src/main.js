import './main.scss';
import menu from './menu.json';
import './assets/fonts/Marcheile-Bold-Condensed.woff';
import './assets/fonts/Marcheile-Bold-Condensed.woff2';
/* DO NOT EDIT ABOVE THIS LINE. You can start editing here. */
import { openMobileNav, closeMobileNav } from './scripts/nav.js';
import { scrollHeader } from './scripts/header.js';
import { filterProduct } from './scripts/menu.js';

window.openMobileNav = openMobileNav;
window.closeMobileNav = closeMobileNav;
window.scrollHeader = scrollHeader;
window.filterProduct = filterProduct;

window.addEventListener('load', function () {
	document.getElementById('pageContent').style.visibility = 'visible';
	document.getElementById('loadingText').style.display = 'none';
});
