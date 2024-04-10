let subTasks = [];
let searchedUsers = [];
let selectedUsers = [];
let defaultValues = [{ status: 'To Do' }, { category: 'User Story' }, { priority: 'Medium' }];
let taskCategoryArrowDropdown = false;
let prioUrgent;
let prioMedium;
let prioLow;

async function initAddTask() {
    await includeHTML();
    await loadUsers();
    await loadTasks();
    renderAddTask('addTaskContainer');
    initializeAndListen();
    setPriority('Medium');
}

/**
 * render the add task container
 * @param {string} id 
 */
function renderAddTask(id) {
    let container = document.getElementById(id);
    container.innerHTML = printAddTask();
    clickToClose();
}

/**
 * clear add Task Container
 */
function clearAddTask() {
    let id = checkIdforAddTask();
    removeClickToCloseListener();
    document.getElementById(id).innerHTML = '';
}

/**
 * 
 * @returns the correct id for the add Task Container
 */
function checkIdforAddTask() {
    let id;
    if (window.location.pathname === '/add_tasks.html') {
        id = 'addTaskContainer';
    } else if (window.location.pathname === '/board.html' && document.getElementById('addTaskBox') && !document.getElementById('addTaskBox').classList.contains('d-none')) {
        id = 'addTaskInBoardContainer';
    } else {
        id = 'editTaskContainer';
    }
    return id;
}

/**
 * set default values and activate event listener for subtask inputfield
 */
function initializeAndListen() {
    renderUsers();
    prioUrgent = document.getElementById('prioUrgent');
    prioMedium = document.getElementById('prioMedium');
    prioLow = document.getElementById('prioLow');
    defaultValues.category = 'User Story';
    defaultValues.priority = 'Medium';
    defaultValues.status = 'To Do';
    submitWithEnter('subtaskInput');
}

/**
 * push new Task to tasks array
 */
async function addTask() {
    let newTask = createTask();
    tasks.push(newTask);
    await saveTasks(tasks);
    resetInputsAndSelections();
    successfullyPopupAddTask();
    hideAddTaskBox();
}

/**
 * convert subtasks to object with boolean
 * @returns object with subtask
 */
function createSubtaskObject() {
    let subTaskObjects = [];
    for (let i = 0; i < subTasks.length; i++) {
        let subTaskObject = { 'name': subTasks[i], 'done': false };
        subTaskObjects.push(subTaskObject);
    }
    return subTaskObjects;
}

/** Popup nach erfolgreicher Task Erstellung */
function successfullyPopupAddTask() {
    const animation = document.getElementById('popupAddtask');
    animation.classList.remove('d-none');
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    setTimeout(() => {
        clearAddTask();
        if(window.location.pathname === '/board.html') {
            renderTasksInBoard();
            return;
        }
        window.location.href = './board.html';
    }, 1000);
}

/**
 * clear input and reset global variables
 */
function resetInputsAndSelections() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('selectedCategory').value = '';
    selectedUsers = [];
    renderSelectedUsers();
    subTasks = [];
    renderSubTasks('subTaskContainer');
    priority = "";
    category = "";
    checkRenderArr();
    setPriority('Medium');
}

/**
 * toggle task category options and rotate dropdown icon
 */
function toggleTaskCategory() {
    let arrow = document.getElementById('dropDownImgCategory');
    document.getElementById('taskCategory').classList.toggle('d-none');
    taskCategoryArrowDropdown = !taskCategoryArrowDropdown;
    taskCategoryArrowDropdown === true ? arrow.style.transform = 'rotate(180deg)' :
        arrow.style.transform = 'rotate(0deg)';
}

/**
 * toogle input field for search user
 */
function showSearchUserInput() {
    document.getElementById('userCategory').classList.remove('d-none');
    document.getElementById('dropDownImg').classList.add('d-none');
    document.getElementById('dropUpImg').classList.remove('d-none');
}

/**
 * Hides the search user input field and toggles visibility of certain elements.
 */
function hideSearchUserInput() {
    document.getElementById('userCategory').classList.add('d-none');
    document.getElementById('dropDownImg').classList.remove('d-none');
    document.getElementById('dropUpImg').classList.add('d-none');
}

/**
 * selcect category for task and push to global variable
 * @param {string} cat selected category
 */
function selectCategory(cat) {
    category = cat;
    document.getElementById('selectedCategory').value = cat;
    toggleTaskCategory();
}

/**
 * show the input field for adding subtasks
 */
function showSubtaskInput() {
    document.getElementById('plusIcon').classList.add('d-none');
    document.getElementById('checkAndCloseIcons').classList.remove('d-none');
}

/**
 * hide the input field and show text with plus button
 * @param {event} event prevent the function from the parent
 */
function hideSubtaskInput(event) {
    event.stopPropagation();
    document.getElementById('checkAndCloseIcons').classList.add('d-none');
    document.getElementById('plusIcon').classList.remove('d-none');
}

/**
 * get text from input and push to array
 * @param {event} event prevent the function from the parent
 */
function addSubTasks(event) {
    event.stopPropagation();
    let input = document.getElementById('subtaskInput');
    subTasks.push(input.value);
    input.value = '';
    renderSubTasks('subTaskContainer');
    hideSubtaskInput(event);
}

/**
 * render the added subTasks
 */
function renderSubTasks(id) {
    let task = document.getElementById(id);
    task.innerHTML = '';
    for (let i = 0; i < subTasks.length; i++) {
        const subTask = subTasks[i];
        task.innerHTML += printSubTasks(subTask, i);
    }
}

/**
 * delete subtask and render subtasks
 * @param {Int} index to delete
 */
function deleteSubTask(index) {
    subTasks.splice(index, 1);
    renderSubTasks('subTaskContainer');
}

/**
 * save edited subtask and render subtasks
 * @param {Int} index to edit
 */
function saveNewSubTask(index) {
    let newTask = document.getElementById(`newSubTask${index}`);
    subTasks.splice(index, 1, newTask.value);
    newTask.value = '';
    renderSubTasks('subTaskContainer');
}

/**
 * show input field to edit subtask
 * @param {Int} index for the subtask to edit
 */
function showEditSubTaskInputField(index) {
    document.getElementById(`subTaskInput${index}`).classList.remove('d-none');
    document.getElementById(`subTask${index}`).classList.add('d-none');
    document.getElementById(`deleteAndEditIcons${index}`).classList.add('d-none');
    document.getElementById(`dividerHorizontal${index}`).classList.remove('d-none');
    document.getElementById(`dividerHorizontal${index}`).style.borderBottomColor = "var(--clr-main2)";
    fillSubtaskEditField(index);
}

/**
 * Updates the input field with the value of the subtask at the specified index.
 * @param {number} index - The index of the subtask to be filled in the input field.
 */
function fillSubtaskEditField(index) {
    let subtask = subTasks[index];
    let input = document.getElementById(`newSubTask${index}`);
    input.value = subtask;
    input.focus();
    let hover = document.querySelectorAll('.hoverSubTask');
    hover.forEach(h => {
        h.classList.remove('hoverSubTask');
    })
}

/**
 * render User
 */
function renderUsers() {
    let userContainer = document.getElementById('userCategory');
    userContainer.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        const user = users[i]['name'];
        userContainer.innerHTML += printUsers(user, i);
        isUserSelected(i);
    }
}

/**
 * render only the users that exist in the searchedUser Array
 */
function renderSearchedUsers() {
    let userContainer = document.getElementById('userCategory');
    userContainer.innerHTML = '';
    for (let i = 0; i < searchedUsers.length; i++) {
        const userName = searchedUsers[i]['name'];
        let index = users.findIndex(u => u.name === userName);
        let user = users[index]['name'];
        userContainer.innerHTML += printUsers(user, index);
        isUserSelected(index);
    }
}

/**
 * check whether users were searched
 */
function checkRenderArr() {
    if (searchedUsers == null || searchedUsers == "" || searchedUsers < 1) {
        renderUsers();
    } else {
        renderSearchedUsers();
    }
}

/**
 * filter user that are searched
 */
function searchUsers() {
    let input = document.getElementById('searchUserInput');
    let filteredUsers = users.filter(user => user.name.toLowerCase().includes(input.value.toLowerCase()));
    searchedUsers = filteredUsers;
    checkRenderArr();
}

/**
 * check if user exist in selected array
 * @param {Int} index of selected or unselected user
 */
function isUserSelected(index) {
    let user = users[index]['name'];
    let selectedUsersIndex = selectedUsers.findIndex(u => u === user);
    if (selectedUsersIndex === -1) {
        document.getElementById(`imgUncheck${index}`).classList.remove('d-none');
        document.getElementById(`imgCheck${index}`).classList.add('d-none');
    } else {
        document.getElementById(`imgUncheck${index}`).classList.add('d-none');
        document.getElementById(`imgCheck${index}`).classList.remove('d-none');
    }
}

/**
 * select user -> push in selectedUser array
 * @param {Int} index of user
 */
function selectUser(index) {
    let user = users[index]['name'];
    selectedUsers.push(user);
    checkRenderArr();
    renderSelectedUsers();
}

/**
 * unselect user, remove from selectedUser array
 * @param {Int} index of user
 */
function unselectUser(index) {
    let user = users[index]['name'];
    let userIndexInSelectedUsers = selectedUsers.findIndex(u => u.toLowerCase() === user.toLocaleLowerCase());
    if (userIndexInSelectedUsers !== -1) {
        selectedUsers.splice(userIndexInSelectedUsers, 1);
    }
    checkRenderArr();
    renderSelectedUsers();
}

/**
 * split the string in two strings, get the first letter from each string
 * @param {string} string to create initials
 * @returns initials
 */
function getInitials(string) {
    let words = string.split(" ");
    let initials = "";
    words.forEach(word => {
        initials += word.charAt(0).toUpperCase();
    });
    return initials;
}

/**
 * render selected Users and get random background color
 */
function renderSelectedUsers() {
    let container = document.getElementById('selectedUser');
    container.innerHTML = '';
    for (let i = 0; i < selectedUsers.length; i++) {
        const user = selectedUsers[i];
        container.innerHTML += printSelectedUsers(user, i);
        document.getElementById(`selectedUser${i}`).style.backgroundColor = getBgColorForContact(user);
    }
}

/**
 * set css class for chosen priority buttons
 * @param {string} prio 
 */
function setPriority(prio) {
    const priorities = ['urgent', 'medium', 'low'];
    const elements = {
        'urgent': prioUrgent,
        'medium': prioMedium,
        'low': prioLow
    };
    for (const priority of priorities) {
        if (prio.toLowerCase() === priority) {
            elements[priority].classList.add(`prio${priority.charAt(0).toUpperCase() + priority.slice(1)}Clicked`);
            defaultValues.priority = priority.charAt(0).toUpperCase() + priority.slice(1);
        } else {
            elements[priority].classList.remove(`prio${priority.charAt(0).toUpperCase() + priority.slice(1)}Clicked`);
        }
    }
}

/**
 * confirm add subtask with Enter
 */
function submitWithEnter(inputId) {
    let input = document.getElementById(inputId);
    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addSubTasks(event);
        }
    });
}

/**
 * create template for task
 * @param {string} title 
 * @param {string} description 
 * @param {date} date 
 * @param {string} taskPriority
 * @param {Array} assignedTo 
 * @param {string} taskCategory 
 * @param {Array} subtasks 
 * @returns 
 */
function createTaskObject(title, description, date, taskPriority, assignedTo, taskCategory, subtasks, taskStatus) {
    return {
        "title": title.value,
        "description": description.value,
        "date": date,
        "priority": taskPriority,
        "assignedTo": assignedTo,
        "category": taskCategory,
        "subtasks": subtasks,
        "status": taskStatus
    }
}

/**
 * @returns created task
 */
function createTask() {
    defaultValues.category = document.getElementById('selectedCategory').value;
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let inputDate = document.getElementById('date').value;
    let date = new Date(inputDate).toString();
    let taskPriority = defaultValues.priority;
    let assignedTo = selectedUsers;
    let subtasks = createSubtaskObject();
    let taskCategory = defaultValues.category;
    let taskStatus = defaultValues.status;
    let newTask = createTaskObject(title, description, date, taskPriority, assignedTo, taskCategory, subtasks, taskStatus);
    return newTask;
}