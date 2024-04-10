/**
 * Find and log in a guest user if present.
 * @param {Array} localUsers - Array of local user objects to search through.
 */
function guestLogIn(localUsers) {
  let guestUser = localUsers.find(user => user.name === 'Guest');
  if (guestUser) {
    sessionStorage.setItem('isLoggedIn', 'Guest');
    window.location.href = './summary.html';
  }
}

/**
 * Function to log in the user using the email and password inputs. *
 * @param {string} emailInput - the email input value
 * @param {string} passwordInput - the password input value
 */
function logIn() {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  if (verifiedLogin(emailInput, passwordInput)) {
    window.location.href = './summary.html';
  }
}

/**
 * Checks if the provided email and password match a user in the database.
 * @param {string} email - The email to be verified.
 * @param {string} password - The password to be verified.
 * @return {boolean} True if the login is verified, false otherwise.
 */
function verifiedLogin(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      sessionStorage.setItem('isLoggedIn', users[i].name);
      return true;
    }
  }
  LoginMatchError();
  return false;
}

/**
 * Constructor for LoginMatchError class.
 */
function LoginMatchError() {
  const confirmedPassword = document.getElementById('password');
  const errorMsgBox = document.getElementById('loginMatch');
  confirmedPassword.classList.add('inputerror');
  errorMsgBox.textContent = 'Wrong password or email Ups! Try again';
  document.getElementById('password').addEventListener('keyup', () => {
    errorMsgBox.textContent = '';
    confirmedPassword.classList.remove('inputerror');
  });
}

/**
 * Function to display a greeting screen on mobile devices.
 */
function greetingScreen() {
  let greetingMobile = document.getElementById('greetingMobile');
  let sumContent = document.getElementById('sumContent');
  if (window.innerWidth <= 480) {
    sumContent.style.display = 'none';
    greetingMobile.style.height = '100dvh';
    setTimeout(function () {
      greetingMobile.style.height = '0';
      sumContent.style.display = 'flex';
      document.getElementById('greetMobile').style.display = 'none';
      document.getElementById('greetingNameMobile').style.display = 'none';
    }, 1300)    
  }  
}

