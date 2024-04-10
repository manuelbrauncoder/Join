/**
 * onload contact page and renders current contactlist
 */
async function initContacts() {
    await includeHTML();
    await loadUsers();
    await loadTasks();
    renderContactList();
}

/**
 * render needed letters in contactlist * 
 */
function renderContactList() {
    document.getElementById('allContacts').innerHTML = '';
    try {
        let currentLetter = '';
        users.sort((a, b) => a.name.localeCompare(b.name));
        for (let i = 0; i < users.length; i++) {
            let firstLetter = users[i]['name'][0].toUpperCase();
            renderLetters(firstLetter, currentLetter);  
            currentLetter = firstLetter;
            document.getElementById(`${firstLetter}-content`).innerHTML +=
                contactsHTML(i);
        }
    } catch (error) {
        console.error("Error fetching or parsing users data:", error);
    }
}

/**
 * render needed letters in contactlist
 * @param {string} firstLetter first letter of the contact
 * @param {string} currentLetter is the first letter to compare with the next Contact
 */
function renderLetters(firstLetter, currentLetter){
    if (firstLetter !== currentLetter) {
        document.getElementById('allContacts').innerHTML += `
            <div class="letterBox">
                <div class="letter">${firstLetter}</div>
                <div id="${firstLetter}-content"></div>
            </div>`;
    }
}

/**
 * render contacts from the array * 
 * @param {integer} i to render the correct contact
 * @returns html for the contact
 */
function contactsHTML(i) {
    let names = users[i]['name'].split(' '); //map iteriert durch jedes wort im array name
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');  //join wird verwendet um die elemente des arrays in eine zeichenkette zu verwandeln
    let bgColor = users[i]['bg'];
    return `
        <div class="contactSmall cp" id="smallContact${i}" onclick="showFloatContact(${i})">
            <div class="initials" style="background-color:${bgColor};">${initials}</div>
            <div>
                <span>${users[i]['name']}</span>
                <p>${users[i]['email']}</p>
            </div>
        </div>`;
}

/**
 * delete the user from the array * 
 * @param {integer} userIndex to delete the correct contact
 */
function deleteUser(userIndex) {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
    } 
    setItem('users', JSON.stringify(users));
    document.getElementById('floatingContact').innerHTML = '';
    renderContactList();
    if (screenWidth <= 1024) {
        showContactListMobil();
    }
    closePopup();
}

/**
 * add clicked contact at the list an color * 
 * @param {integer} index to at the correct contact
 */
function addBgContact(index) {
    let contacts = document.querySelectorAll('.contactSmall');
    for (let x = 0; x < contacts.length; x++) {
        let contact = contacts[x];

        if (index === x) {
            contact.classList.add('contactBgClicked');
        } else {
            contact.classList.remove('contactBgClicked');
        }
    };
}

/**
 * show detailview from the selected contact * 
 * @param {integer} i to show the correct contact
 */
function showFloatContact(i) {
    addBgContact(i);
    let name = users[i]['name'];
    let email = users[i]['email'];
    document.getElementById('contactMobile').classList.add('d-none');
    document.getElementById('floatingContact').classList.remove('d-none');
    document.getElementById('floatingContact').innerHTML = '';
    document.getElementById('floatingContact').innerHTML = floatContactHTML(name, email, i);
}

/**
 * checks whether the contact has a telephone number * 
 * @param {integer} i to check the correct contact
 * @returns the phonenumber if available
 */
function checkPhone(i) {
    let phone = users[i]['phone'];
    if (phone) {
        return phone
    } else
        phone = '';
    return phone
}

/**
 * create random color * 
 * @returns the random color
 */
function newBgColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = `rgb(${x},${y},${z})`;
    return bgColor
}

/**
 * create new contact and stores it in the array * 
 */
async function createNewContact() {
    let bgColor = newBgColor();
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let phone = document.getElementById('contactPhone').value;
    if (name && email && phone) {
        users.push({
            name: name,
            email: email,
            phone: phone,
            bg: bgColor,
        });
        await setItem('users', JSON.stringify(users));
        successfullyPopupAddContact();
        closePopup();
    } 
}

/**
 * show popup after create an new contact * 
 */
function successfullyPopupAddContact() {
    const animation = document.getElementById('popupCreateContact');
    animation.classList.remove('d-none');
    setTimeout(() => {
        renderContactList();
    }, 2000);
}

/**
 * load the current contactinfos to the inputfields and displays it * 
 * @param {integer} i show the correct contact
 */
function editContact(i) {
    showEditPopup(i);
    let name = users[i]['name'];
    let email = users[i]['email'];
    document.getElementById('contactName').value = `${name}`;
    document.getElementById('contactEmail').value = `${email}`;
    document.getElementById('contactPhone').value = `${checkPhone(i)}`;
    BtnClickable();
}

/**
 * prevents the save button from being pressed if the inputfields are empty * 
 */
function BtnClickable() {
    document.getElementById('editForm').addEventListener('input', function () {
        let name = document.getElementById('contactName').value;
        let email = document.getElementById('contactEmail').value;
        let phone = document.getElementById('contactPhone').value;
        let submitButton = document.getElementById('saveEditUser');

        if (name && email && phone) {
            submitButton.disabled = false;
            submitButton.classList.remove('btn-disabled');
        } else {
            submitButton.disabled = true;
            submitButton.classList.add('btn-disabled');
        }
    });
}

/**
 * overwrite and save the contact content * 
 * @param {integer} i to overwrite the correct contact
 */
function saveUser(i) {
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let phone = document.getElementById('contactPhone').value;
    users[i]['name'] = name;
    users[i]['email'] = email;
    users[i]['phone'] = phone;
    saveStorageUser(i);
    document.getElementById('floatingContact').innerHTML = '';
    renderContactList();
    screenMobile();
    closePopup();
}

/**
 * Saves the 'users' data to storage and retrieves it.
 */
async function saveStorageUser(){
    await setItem('users', JSON.stringify(users));
    await getItem('users');
}

/**
 * Function to check screen width and show contact list for mobile devices.
 */
function screenMobile(){
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth <= 1024) {
        showContactListMobil();
    }
}

/**
 * show popup for adding a new contact * 
 */
function showAddPopup() {
    document.getElementById('contactPopup').classList.remove('d-none');
    document.getElementById('contactPopup').style.right = 0;
    document.getElementById('contactPopup').innerHTML = '';
    document.getElementById('contactPopup').innerHTML = createContactPopupHTML();
    document.getElementById('contactPopup').style.animation = 'slidingRight 0.2s ease-in-out';
    document.getElementById('contactPopup').style.left = '';
    document.getElementById('closePopup').style.borderTopLeftRadius = '30px';
    document.getElementById('closePopup').style.borderTopRightRadius = '0px';
    document.getElementById('background').classList.add('back');
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
}

/**
 * show popup to edit a contact * 
 * @param {integer} i to edit the correct contact
 */
function showEditPopup(i) {
    document.getElementById('contactPopup').classList.remove('d-none');
    document.getElementById('contactPopup').innerHTML = '';
    document.getElementById('contactPopup').innerHTML = editContactPopupHTML(i);
    document.getElementById('contactPopup').style.animation = 'slidingLeft 0.2s ease-in-out';
    document.getElementById('contactPopup').style.left = 0;
    document.getElementById('closePopup').style.borderTopLeftRadius = '0px';
    document.getElementById('closePopup').style.borderTopRightRadius = '30px';
    document.getElementById('background').classList.add('back');
}

/**
 * close the Add- or the Editpopup * 
 */
function closePopup() {
    document.getElementById('contactPopup').classList.add('d-none');
    document.getElementById('background').classList.remove('back');
    let dotPopup = document.getElementById('popupDotMenue');
    if (dotPopup) {
        document.getElementById('popupDotMenue').classList.add('d-none');
    }    
}

/**
 * displays the contacts in the mobile version * 
 */
function showContactListMobil() {
    document.getElementById('contactMobile').classList.remove('d-none');
    document.getElementById('contactList').classList.remove('d-none');
    document.getElementById('floatingContact').classList.add('d-none');
}

/**
 * displays submenue from the detailview in the mobile version * 
 */
function showDotMenu() {
    document.getElementById('popupDotMenue').classList.remove('d-none');
}

/**
 * hide submenue from the detailview in in the mobile version * 
 */
function closeDotMenue() {
    let dotPopup = document.getElementById('popupDotMenue');
    if (dotPopup) {
        document.getElementById('popupDotMenue').classList.add('d-none');
    } 
}

/**
 * stops the close function for popups * 
 * @param {event} event prevent the function from the parent 
 */
function notClose(event) {
    event.stopPropagation();
}



