/** onlaod called signup page */
async function initSignUp() {
  await loadUsers();
}

/**
 * Registration of a new user, with verification of the email address and password match.
 */
function register() {
  let bgColor = newBgColor();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmedPassword = document.getElementById('confirmedPassword').value;
  const isEmailAvailable = !users.some(user => user.email === email);
  if (isEmailAvailable == true) {
    handleSignUp(name, email, password, confirmedPassword, bgColor);
  } else {
    displayEmailInUseError();
  }
}

/**
 * Asynchronously handles user sign up, adding user to the database if password is confirmed. *
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {string} confirmedPassword - The confirmed password of the user
 * @param {string} bgColor - The background color for the user
 * @return {void} No return value
 */
async function handleSignUp(name, email, password, confirmedPassword, bgColor) {
  if (errorMsgPasswordConfirm(confirmedPassword, password)) {
    users.push({ name: name, email: email, password: password, phone: null, bg: bgColor });
    await setItem('users', JSON.stringify(users));
    resetForm();
    popup();
  } else {
    displayPasswordMatchError();
  }
}

/**
 * Compares the confirmed password with the original password. *
 * @param {type} confirmedPassword - The confirmed password to compare.
 * @param {type} password - The original password to compare.
 * @return {boolean} Returns true if the confirmed password matches the original password, otherwise false.
 */
function errorMsgPasswordConfirm(confirmedPassword, password) {
  if (password !== confirmedPassword) {
    return false;
  }
  return true;
}

/**
 * Displays an error message when the confirmed password input does not match the original password input. *
 */
function displayPasswordMatchError() {
  const confirmedPassword = document.getElementById('confirmedPassword');
  const errorMsgBox = document.getElementById('password-match');
  confirmedPassword.classList.add('inputerror');
  errorMsgBox.textContent = 'Ups! your password don’t match';
  document.getElementById('confirmedPassword').addEventListener('keyup', () => {
    errorMsgBox.textContent = '';
    confirmedPassword.classList.remove('inputerror');
  });
}

/**
 * Display error message when email is already in use and provide functionality to clear the error message.
 */
function displayEmailInUseError() {
  const emailInput = document.getElementById('email');
  const errorMsgBox = document.getElementById('email-exist');
  emailInput.classList.add('inputerror');
  errorMsgBox.textContent = 'Email already in use.';
  emailInput.addEventListener('keyup', () => {
    errorMsgBox.textContent = '';
    emailInput.classList.remove('inputerror');
  });
}

/**
 * Function to handle signup process based on checkbox state.
 */
function checkedSignup() {
  const checkbox = document.getElementById('accept-policy');
  let button = document.getElementById('signupBtn');
  checkbox.src.includes('unchecked') ? (
    checkbox.src = 'assets/img/check_checked.png', button.disabled = false, button.classList.remove('btn-disabled')
  ) : (
    checkbox.src = 'assets/img/check_unchecked.png', button.disabled = true, button.classList.add('btn-disabled')
  );
}

/**
 * Opens a popup with an animation and redirects to the index page after a delay.
 */
function popup() {
  const animation = document.getElementById('popup');
  animation.classList.remove('d-none');
  setTimeout(() => {
    window.location.href = './index.html';
  }, 2000);
}

/**
 * Resets the values of form fields with the IDs 'name', 'email', 'password', and 'password'.
 */
function resetForm() {
  const formFields = ['name', 'email', 'password', 'password'];
  formFields.forEach(field => document.getElementById(field).value = '');
}

/**
 * Toggles the visibility of the password input field based on the inputId provided.
 * @param {string} inputId - The id of the input field to toggle
 */
function togglePasswordEye(inputId) {
  const inputValue = document.getElementById(inputId).value.trim();
  if (inputValue) {
    if (inputId === 'password') {
      document.getElementById('password-icon').src = './assets/img/visibility_off.png';
    } else if (inputId === 'confirmedPassword') {
      document.getElementById('confirmedPassword-icon').src = './assets/img/visibility_off.png';
    }
  }
}

/**
 * Toggles the visibility of the password in the input field based on the inputId.
 * @param {string} inputId - The id of the input field to toggle visibility for.
 */
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const inputValue = input.value.trim();
  if (inputValue) {
    if (input.type === "password") {
      input.type = "text";
      document.getElementById(inputId + '-icon').src = './assets/img/visibility.png';
    } else {
      input.type = "password";
      document.getElementById(inputId + '-icon').src = './assets/img/visibility_off.png';
    }
  }
}
