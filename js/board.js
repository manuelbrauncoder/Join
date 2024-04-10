let searchedTasks;

/**
 * init board
 */
async function initBoard() {
   await includeHTML();
   await loadUsers();
   await loadTasks();
   renderTasksInBoard();
   startTouchEvents();
}

/**
 * show Add Task Box and set default values for task
 * @param {string} status status string to set correct status for task
 */
function showAddTaskBox(status) {
   let box = document.getElementById('addTaskBox');
   let mainContent = document.getElementById('mainContent');
   let headline = document.getElementById('addTaskHeadline');
   if (window.matchMedia('(max-width: 500px)').matches) {
      showMobileTaskBox(status, mainContent, headline, box);
   } else {
      showDesktopTaskBox(status, box)
   }
}

/**
 * show task box for desktop
 * @param {*} status 
 * @param {*} box 
 */
function showDesktopTaskBox(status, box) {
   box.classList.remove('d-none');
      setTimeout(() => {
         box.style.right = 0;
      }, 100);
      renderAddTask('addTaskInBoardContainer');
      initializeAndListen();
      setPriority('medium');
      setDefaultValues(status);
      document.getElementById('mainContent').style.position = 'fixed';
}

/**
 * show task box for mobile
 * @param {*} status 
 * @param {*} mainContent 
 * @param {*} headline 
 * @param {*} box 
 */
function showMobileTaskBox(status, mainContent, headline, box) {
      box.classList.remove('d-none');
      mainContent.classList.add('dNone');
      headline.classList.add('d-none');
      renderAddTask('addTaskInBoardContainer');
      initializeAndListen();
      setPriority('medium');
      setDefaultValues(status);
}

/**
 * hide task box
 */
function hideMobileAddTaskBox() {
   clearAddTask();
   document.getElementById('mainContent').classList.remove('dNone');
   document.getElementById('addTaskBox').classList.add('d-none');
   document.getElementById('addTaskHeadline').classList.remove('d-none');
}

/**
 * set default values
 * @param {string} status 
 */
function setDefaultValues(status) {
   defaultValues.status = `${status}`;
   defaultValues.category = 'User Story';
   defaultValues.priority = 'Medium';
}

/**
 * hide add task box
 */
function hideAddTaskBox() {
   clearAddTask();
   document.getElementById('mainContent').style.position = 'relative';
   if (window.location.pathname.endsWith('/board.html')) {
      let box = document.getElementById('addTaskBox');
      box.style.right = '-1000px';
      setTimeout(() => {
         box.classList.add('d-none');
      }, 100);
   }
}

/**
 * clear all container for tasks
 */
function clearContainer() {
   let ids = ['toDoContainer', 'inProgressContainer', 'awaitFeedbackContainer', 'doneContainer'];
   ids.forEach(id => {
      let container = document.getElementById(id);
      if (container) {
         container.innerHTML = '';
      }
   });
}

/**
 * render tasks in board
 */
function renderTasksInBoard() {
   clearContainer();
   for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      let status = task['status'];
      let contacts = task['assignedTo'];
      let subTasksDoneLength = calculateSubtasksDone(i);
      let container = checkContainer(status);
      container.innerHTML += printTasksInBoard(task, i, subTasksDoneLength);
      let categoryContainer = document.getElementById(`todoCategory${i}`);
      renderAssignedTo(contacts, i);
      getColorForCategory(i, categoryContainer);
      changeProgressValue(i);
      checkIfSubtasksEmtpty(i);
   }
   checkContainerEmpty();
}

/**
 * hide subtask container if no subtasks exist for task
 * @param {int} index 
 */
function checkIfSubtasksEmtpty(index) {
   let subtaskContainer = document.getElementById(`todoSubtasks${index}`);
   if (tasks[index]['subtasks'].length == 0) {
      subtaskContainer.classList.add('d-none');
   }
}

/**
 * calculate all subtasks for task with index
 * @param {int} index 
 * @returns 
 */
function calculateSubtasksDone(index) {
   let counter = 0;
   let subtasksObjects = tasks[index]['subtasks'];
   for (let i = 0; i < subtasksObjects.length; i++) {
      const subtask = subtasksObjects[i];
      if (subtask.done === true) {
         counter += 1;
      }
   }
   return counter;
}

/**
 * set the progress of the progress bar
 * @param {int} index for task
 */
function changeProgressValue(index) {
   let progressInPercent;
   let progressBar = document.getElementById(`progressBar${index}`);
   let subtasksDone = calculateSubtasksDone(index);
   let allSubtasks = tasks[index]['subtasks'].length;
   let calcPercent = (subtasksDone / allSubtasks) * 100;
   if (isNaN(calcPercent) == true) {
      progressInPercent = 0;
   } else {
      progressInPercent = calcPercent;
   }
   progressBar.value = progressInPercent;
}

/**
 * set the color for the task category
 * @param {int} index 
 */
function getColorForCategory(index, container) {
   let category = tasks[index]['category'];
   category == 'User Story' ? container.style.backgroundColor = 'var(--clr-orange)' : container.style.backgroundColor = 'var(--clr-blue)';
}

/**
 * render the contacts, that are assigned to the task
 * @param {string} contacts 
 * @param {int} i 
 */
function renderAssignedTo(contacts, i) {
   let assignedToContainer = document.getElementById(`todoAssignedTo${i}`);
   assignedToContainer.innerHTML = '';
   let maxContacts;
   contacts.length > 3 ? maxContacts = 3 : maxContacts = contacts.length;
   let tuMuchContainer = document.getElementById(`ifToMuch${i}`);
   for (let j = 0; j < maxContacts; j++) {
      const contact = contacts[j];
      let contactId = i.toString() + j.toString();
      assignedToContainer.innerHTML += printAssignedTo(contact, contactId);
      let contactContainer = document.getElementById(`${contactId}`);
      contactContainer.style.backgroundColor = getBgColorForContact(contact);
   }
   addMissingContacts(contacts, maxContacts, tuMuchContainer);
}

/**
 * add missing contacts
 * @param {*} contacts 
 * @param {*} maxContacts 
 * @param {*} container 
 * @returns 
 */
function addMissingContacts(contacts, maxContacts, container) {
   let toMuch = contacts.length - maxContacts;
   if (toMuch <= 0) {
      return;
   } else {
      container.innerHTML = /*html*/`<span>+${toMuch}</span>`;
   }
}

/**
 * get the background color which is stored in users array
 * @param {string} contact 
 * @returns 
 */
function getBgColorForContact(contact) {
   let userIndex = users.findIndex(u => u.name.toLowerCase() == contact.toLowerCase());
   if (userIndex !== -1) {
      let bgColor = users[userIndex]['bg'];
      return bgColor;
   } else {
      return 'rgb(175, 170, 170)';
   }
}

/**
 * get the right image for the priority
 * @param {string} prio 
 * @returns 
 */
function getPrioIcon(prio) {
   let path = `./assets/img/prio-${prio.toLowerCase()}.png`;
   return path;
}

/**
 * 
 * @param {string} status 
 * @returns the container for the task
 */
function checkContainer(status) {
   switch (status) {
      case 'To Do':
         return document.getElementById('toDoContainer');
      case 'In progress':
         return document.getElementById('inProgressContainer');
      case 'Await feedback':
         return document.getElementById('awaitFeedbackContainer');
      case 'Done':
         return document.getElementById('doneContainer');
      default:
         return document.getElementById('toDoContainer');
   }
}

/**
 * check is search is active
 */
async function checkRenderTasks() {
   if (searchedTasks == null || searchedTasks == "" || searchedTasks.length < 1) {
      renderTasksInBoard();
      await saveTasks(tasks);
   } else {
      renderSearchedTasks();
      await saveTasks(tasks);
   }
}

/**
 * check if a status has no tasks, then render empty text
 */
function checkContainerEmpty() {
   let ids = ['toDoContainer', 'inProgressContainer', 'awaitFeedbackContainer', 'doneContainer'];
   ids.forEach(id => {
      let emptyContainerText = getContainerName(id);
      let container = document.getElementById(id);
      if (container.hasChildNodes() === false) {
         container.innerHTML = /*html*/ `<div class="emptyBox"><span>${emptyContainerText}</span></div>`;
      }
   });
}

/**
 * 
 * @param {int} id of task container
 * @returns the name of the container
 */
function getContainerName(id) {
   const containerNames = {
      'doneContainer': 'No tasks Done',
      'toDoContainer': 'No tasks To Do',
      'inProgressContainer': 'No tasks in Progress',
      'awaitFeedbackContainer': 'No tasks for Feedback'
   };
   return containerNames[id] || 'Unknown Container';
}

/**
 * push the search output in array and remove duplicates with set
 */
function searchTasks() {
   let input = document.getElementById('findTask');
   let filteredTasksTitle = tasks.filter(task => task.title.toLowerCase().includes(input.value.toLowerCase()));
   let filteredTasksDescription = tasks.filter(task => task.description.toLowerCase().includes(input.value.toLowerCase()));
   searchedTasks = filteredTasksTitle.concat(filteredTasksDescription);
   searchedTasks = [...new Set(searchedTasks)];
   if(searchedTasks.length === 0) {
      searchedTasks = [];
      renderSearchedTasks();
   } else {
      checkRenderTasks();
   }
}

/**
 * render searched tasks
 */
function renderSearchedTasks() {
   clearContainer();
   for (let i = 0; i < searchedTasks.length; i++) {
      const taskTitle = searchedTasks[i]['title'];
      let index = tasks.findIndex(t => t.title === taskTitle);
      let subTasksDoneLength = calculateSubtasksDone(index);
      let task = tasks[index];
      let status = tasks[index]['status'];
      let contacts = tasks[index]['assignedTo'];
      let container = checkContainer(status);
      container.innerHTML += printTasksInBoard(task, index, subTasksDoneLength);
      let categoryContainer = document.getElementById(`todoCategory${index}`);
      renderAssignedTo(contacts, index);
      getColorForCategory(index, categoryContainer);
      changeProgressValue(index);
   }
   checkContainerEmpty();
}