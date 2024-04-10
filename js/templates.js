/**
 * Asynchronously includes HTML content from specified files into the matching elements with the "template" attribute.
 * @return {Promise} A promise that resolves when all HTML content is successfully included.
 */
async function includeHTML() {
  const includeElements = document.querySelectorAll("[template]");
  const promises = Array.from(includeElements).map(async element => {
    const file = element.getAttribute("template");
    const resp = await fetch(file);
    const html = resp.ok ? await resp.text() : null;
    element.innerHTML = html || "Page not found";
  });
  await Promise.all(promises);
  setActiveSiteClass('nav a', 'active-site');
  setActiveSiteClass('li a', 'active-site-legal-topics');
  showInitials();
}

/**
 * Hides specified elements on the page. *
 * @param {string} id - The id of the element to hide.
 */
function hideEelements() {
  const elements = ['headerInfo', 'navLinks', 'mobileNavLinks'];
  elements.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

/** click initial icon in header to show menu */
function showLogoutMenu() {
  let logoutMenu = document.getElementById('logout-menu');
  logoutMenu.classList.toggle('d-none');
}

/** close logout menu on click outside the menu*/
document.addEventListener('click', function(event) {
  let logoutMenu = document.getElementById('logout-menu');
  let headerInfo = document.getElementById('headerInfo');
  let targetElement = event.target;
  let isOnIndexOrSignUp = document.querySelector('body[onload="initSignUp()"]') || document.querySelector('body[onload="init()"]');
  if (!isOnIndexOrSignUp && !logoutMenu.contains(targetElement) && !headerInfo.contains(targetElement)) {
      logoutMenu.classList.add('d-none');
  }
});

/**
 * Sets the active class for the link that matches the current page. *
 * @param {string} selector - The CSS selector of the links to be checked.
 * @param {string} activeClass - The class name to be added to the active link.
 */
function setActiveSiteClass(selector, activeClass) {
  const activePage = window.location.pathname;
  const links = document.querySelectorAll(selector);
  const mobileNavLinks = document.getElementById("mobileNavLinks");
  const mobileLinks = mobileNavLinks.getElementsByTagName("a");
  links.forEach(link => {
    if (link.href && link.href.includes(activePage)) {
      link.classList.add(activeClass);
      updateMobileLinks(activePage, mobileLinks);
    }
  });
}

/**
 * Updates the mobile links on the page based on the active page. *
 * @param {string} activePage - The active page to compare links with.
 * @param {Array} links - An array of link elements to check and update.
 */
function updateMobileLinks(activePage, links) {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (link.href && link.href.includes(activePage)) {
      const imageName = link.id.split("-")[0];
      const imagePath = `./assets/img/mobile_${imageName}_blue.png`;
      link.getElementsByTagName("img")[0].src = imagePath;
    }
  }
}

/**
 * Function to display user initials in a specified container if the user is logged in.
 */
function showInitials() {
  const initialcontainer = document.getElementById('userInitial');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn || isLoggedIn.trim() === '') {
    initialcontainer.innerHTML = '';
    hideEelements();
    return;
  }
  const names = isLoggedIn.split(' ');
  const initials = names.map(word => word.charAt(0).toUpperCase()).join('');
  initialcontainer.innerHTML = initials;
}




