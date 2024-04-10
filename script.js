let checkBoxLogin = false;
let historyLength = window.history.length;

/**
 * Initializes the application by loading users and tasks.
 */
async function init() {
  await loadUsers();
  await loadTasks();
}

/**
 * Initializes legal topics by including HTML.
 */
async function initLegalTopics() {
  await includeHTML();
}

/**
 * Removes saved email and password from local storage if they exist.
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function unrememberMe() {
  let emailSaved = localStorage.getItem('email');
  let passwordSaved = localStorage.getItem('password');
  if (emailSaved && passwordSaved) {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}

/**
 * Function to remember user login information if the 'Remember Me' checkbox is checked.
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function rememberMe() {
  let checkBoxImage = document.getElementById('remember-me');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  checkBoxImage.src = checkBoxImage.src.includes('unchecked') ? './assets/img/check_checked.png' : './assets/img/check_unchecked.png';
  if (checkBoxLogin = !checkBoxLogin) {
    if (email.value && password.value) {
      localStorage.setItem('email', email.value);
      localStorage.setItem('password', password.value);
    }
  }
}

/** back arrow in signup page */
function backButton() {
  window.location.href = '/index.html';
  document.getElementById('loadingScreen').style.display = 'none';
  document.getElementById('loadingScreenImg').style.display = 'none';
}

/**
 * Function to go back one page in the browser history.
 */
function goBack() {
  console.log('Going back one page...');
  console.log('History length before checking:', window.history.length);
  window.history.go(-1);
  if (window.history.length <= historyLength) {
    console.log('Closing window...');
    window.close();
  } else {
    console.log('Decrementing history length...');
    historyLength--;
  }
  console.log('Final history length:', window.history.length);
}




