/**
 * create html code for the detailview of the contact * 
 * @param {string} name of the clicked contact
 * @param {string} email of the clicked contact
 * @param {integer} i to select the correct contact
 * @returns html
 */

function floatContactHTML(name, email, i) {
    let bgColor = users[i]['bg'];
    let names = users[i]['name'].split(' '); 
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    return /*html*/ `
        <div id="floatMobil">
            <h2>Contact Information</h2>
            <div id="arrowBack" class="cp" onclick="showContactListMobil()">
                <img src="./assets/img/arrow-left-line.png" alt="arrowBack">
            </div>
        </div>
        <div class="floatingTop">            
            <div id="${i}" class="initialsFloating" style="background-color:${bgColor};">${initials}</div>
            <div class="floatingInteracts">
                <span>${name}</span>
                <div class="floatingBtn">
                     <p class="cp" onclick="editContact(${i})"><img src="./assets/img/edit.png" alt="edit">Edit</p>
                     <p class="cp" onclick="deleteUser(${i})"><img src="./assets/img/delete.png" alt="trashcan">Delete</p>
                </div>
            </div>
        </div>
        <div class="floatingBottom">
        <h2 id="contactInfo">Contact Information</h2>
        <div>
            <h3>Email</h3>
            <div id="emailFloating">${email}</div>
        </div>
        <div>
            <h3>Phone</h3>
            <div id="phoneFloating">${checkPhone(i)}</div>
        </div>
        </div>
        <button id="contactMobileFloat" class="blue-btn active-btn-svg cp" onclick="showDotMenu(); notClose(event)">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_19053_6692" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1" y="0" width="33" height="32">
            <rect x="-0.00195312" width="32" height="32" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_19053_6692)">
            <path d="M15.9977 26.6666C15.2644 26.6666 14.6366 26.4055 14.1144 25.8833C13.5922 25.361 13.3311 24.7333 13.3311 23.9999C13.3311 23.2666 13.5922 22.6388 14.1144 22.1166C14.6366 21.5944 15.2644 21.3333 15.9977 21.3333C16.7311 21.3333 17.3588 21.5944 17.8811 22.1166C18.4033 22.6388 18.6644 23.2666 18.6644 23.9999C18.6644 24.7333 18.4033 25.361 17.8811 25.8833C17.3588 26.4055 16.7311 26.6666 15.9977 26.6666ZM15.9977 18.6666C15.2644 18.6666 14.6366 18.4055 14.1144 17.8833C13.5922 17.361 13.3311 16.7333 13.3311 15.9999C13.3311 15.2666 13.5922 14.6388 14.1144 14.1166C14.6366 13.5944 15.2644 13.3333 15.9977 13.3333C16.7311 13.3333 17.3588 13.5944 17.8811 14.1166C18.4033 14.6388 18.6644 15.2666 18.6644 15.9999C18.6644 16.7333 18.4033 17.361 17.8811 17.8833C17.3588 18.4055 16.7311 18.6666 15.9977 18.6666ZM15.9977 10.6666C15.2644 10.6666 14.6366 10.4055 14.1144 9.88325C13.5922 9.36103 13.3311 8.73325 13.3311 7.99992C13.3311 7.26659 13.5922 6.63881 14.1144 6.11659C14.6366 5.59436 15.2644 5.33325 15.9977 5.33325C16.7311 5.33325 17.3588 5.59436 17.8811 6.11659C18.4033 6.63881 18.6644 7.26659 18.6644 7.99992C18.6644 8.73325 18.4033 9.36103 17.8811 9.88325C17.3588 10.4055 16.7311 10.6666 15.9977 10.6666Z" fill="white"/>
            </g>
            </svg>
        </button>
        <div id="popupDotMenue" class="d-none" onclick="notClose(event)">
        <div class="popupMenue">
            <p class="cp" onclick="editContact(${i})"><img src="./assets/img/edit.png" alt="edit">Edit</p>
            <p class="cp" onclick="deleteUser(${i})"><img src="./assets/img/delete.png" alt="trashcan">Delete</p>
        </div> 
    </div>`;
}

/**
 * create html code for the Addpopup to add a new contact * 
 * @returns html
 */
function createContactPopupHTML() {
    document.getElementById('contactPopup').innerHTML = '';
    return  /*html*/`
    <div id="closePopup">
        <img onclick="closePopup()" src="./assets/img/close_white.png" alt="close">
    </div>
    <div id="topPopup">
        <img src="./assets/img/logo.png" alt="logo">
        <span>Add contact</span>
        <p>Tasks are better with a team!</p>
    </div>
    <div id="bottomPopup">
        <div class="avatarDiv">
            <div id="avatar">
                <img src="./assets/img/avatar_placeholder.png" alt="avatar">
            </div>
        </div>                  
        <form class="input-box" onsubmit="createNewContact(); return false">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" autofocus required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" autofocus required>
                <img src="./assets/img/mail.png" alt="mail">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="tel" placeholder="Phone" autofocus required>
                <img src="./assets/img/call.png" alt="call">
            </div>
            <div id="popupBtn">
                <button class="btnCancel cp" onclick="closePopup()">Cancel<svg width="25" height="25" viewBox="0 0 25 25" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.501 12.983L17.744 18.226M7.258 18.226L12.501 12.983L7.258 18.226ZM17.744 7.73999L12.5 12.983L17.744 7.73999ZM12.5 12.983L7.258 7.73999L12.5 12.983Z" stroke="#647188" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                 </button>
                <button class="btnCreate active-btn-svg cp">Create contact<svg width="14" height="14" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.54996 9.65L14.025 1.175C14.225 0.975 14.4625 0.875 14.7375 0.875C15.0125 0.875 15.25 0.975 15.45 1.175C15.65 1.375 15.75 1.6125 15.75 1.8875C15.75 2.1625 15.65 2.4 15.45 2.6L6.24996 11.8C6.04996 12 5.81663 12.1 5.54996 12.1C5.2833 12.1 5.04996 12 4.84996 11.8L0.549963 7.5C0.349963 7.3 0.25413 7.0625 0.262463 6.7875C0.270796 6.5125 0.374963 6.275 0.574963 6.075C0.774963 5.875 1.01246 5.775 1.28746 5.775C1.56246 5.775 1.79996 5.875 1.99996 6.075L5.54996 9.65Z" fill="white"></path>
                    </svg>
                </button>
            </div>                    
        </form>
    </div>`;
}

/**
 * create html code for the Editpopup to edit a contact
 * @param {integer} i to select the correct contact
 * @returns html
 */
function editContactPopupHTML(i) {
    let bgColor = users[i]['bg'];
    let names = users[i]['name'].split(' '); 
    let initials = names.map(word => word.charAt(0).toUpperCase()).join('');
    return  /*html*/`
    <div id="closePopup">
        <img onclick="closePopup()" src="./assets/img/close_white.png" alt="close">
    </div>
    <div id="topPopup">
        <img src="./assets/img/logo.png" alt="logo">
        <span>Edit contact</span>
        <p class="editPopupP">Tasks are better with a team!</p>
    </div>
    <div id="bottomPopup">
        <div class="avatarDiv">
            <div id="avatar">
                <div id="${i}" class="initialsFloating" style="background-color:${bgColor};"
                >${initials}</div>            
            </div>    
        </div>              
        <form id="editForm" class="input-box" onsubmit="saveUser(${i}); return false;">
            <div class="input-field">
                <input id="contactName" type="text" placeholder="Name" autofocus required>
                <img src="./assets/img/person.png" alt="avatar">
            </div>
            <div class="input-field">
                <input id="contactEmail" type="email" placeholder="Email" autofocus required>
                <img src="./assets/img/mail.png" alt="mail">
            </div>
            <div class="input-field">
                <input id="contactPhone" type="number" placeholder="Phone" autofocus required>
                <img src="./assets/img/call.png" alt="call">
            </div>
            <div id="popupBtn">
                <button class="btnDelete cp" onclick="deleteUser(${i})">Delete</button>                
                <button type="submit" id="saveEditUser" class="btnCreate blue-btn-edit active-btn-svg cp"><p>Save</p><svg width="14" height="14" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.54996 9.65L14.025 1.175C14.225 0.975 14.4625 0.875 14.7375 0.875C15.0125 0.875 15.25 0.975 15.45 1.175C15.65 1.375 15.75 1.6125 15.75 1.8875C15.75 2.1625 15.65 2.4 15.45 2.6L6.24996 11.8C6.04996 12 5.81663 12.1 5.54996 12.1C5.2833 12.1 5.04996 12 4.84996 11.8L0.549963 7.5C0.349963 7.3 0.25413 7.0625 0.262463 6.7875C0.270796 6.5125 0.374963 6.275 0.574963 6.075C0.774963 5.875 1.01246 5.775 1.28746 5.775C1.56246 5.775 1.79996 5.875 1.99996 6.075L5.54996 9.65Z" fill="white"></path>
                </svg>
                </button>
            </div>                    
        </form>
    </div>
    `;
}