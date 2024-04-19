/** onload summary page, with check to show greeting-slider after login below 480px */
async function initSummary() {
  checkLoginState();
  if (!sessionStorage.getItem('greetingShown')) {
    greetingScreen();
    sessionStorage.setItem('greetingShown', true);
  }
  await includeHTML();
  await loadTasks();
  loginStatus();
  counterSummery(tasks);
  fillCorrectPlural();
}

/** check who is logged in */
function loginStatus() {
  let isLoggedIn = sessionStorage.getItem('isLoggedIn');
  document.getElementById('greetingName').innerHTML = `${isLoggedIn}`;
  document.getElementById('greetingNameMobile').innerHTML = `${isLoggedIn}`;
  greetingMessage();
}

/** shows greeting depending on time of day */
function greetingMessage() {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let greetingMessage;
  const greetings = { morning: "Good Morning,", afternoon: "Good Day,", evening: "Good afternoon,", night: "Good night," }
  if (currentHour < 12) {
    greetingMessage = greetings.morning;
  } else if (currentHour < 18) {
    greetingMessage = greetings.afternoon;
  } else if (currentHour < 22) {
    greetingMessage = greetings.evening;
  } else {
    greetingMessage = greetings.night;
  }
  document.getElementById('greeting').innerHTML = greetingMessage;
  document.getElementById('greetMobile').innerHTML = greetingMessage;
}

/**
 * Generates a summary of the tasks provided and updates the corresponding HTML elements with the task counts.
 * @param {Array} tasks - An array of task objects
 */
function counterSummery(tasks) {
  const tasksInBoard = document.getElementById('tib');
  const tasksToDo = document.getElementById('todo');
  const tasksinProgress = document.getElementById('progress');
  const tasksawFeedback = document.getElementById('awFeedback');
  const taskstasksDone = document.getElementById('tasksDone');
  const tasksUrgent = document.getElementById('urgent');
  let allTasks = 0;
  let allToDo = 0;
  let inProgress = 0;
  let awFeedback = 0;
  let tasksDone = 0;
  let urgent = 0;
  for (const task of tasks) {
    allTasks++;
    switch (task.status) {
      case "To Do":
        allToDo++;
        break;
      case "In progress":
        inProgress++;
        break;
      case "Await feedback":
        awFeedback++;
        break;
      case "Done":
        tasksDone++;
        break;
    }
    if (task.priority === "Urgent") {
      urgent++;
    }
  }
  tasksInBoard.textContent = allTasks;
  tasksToDo.textContent = allToDo;
  tasksinProgress.textContent = inProgress;
  tasksawFeedback.textContent = awFeedback;
  taskstasksDone.textContent = tasksDone;
  tasksUrgent.textContent = urgent;
  nextUrgent();
}

/**
 * Finds the next urgent task and updates the urgentDate element with the formatted date.
 * @param {none}
 */
function nextUrgent() {
  const tasksWithDateObjects = tasks.map(task => ({
    ...task,
    date: new Date(task.date)
  }));
  const urgentTasks = tasksWithDateObjects.filter(task => task.priority === "Urgent");
  urgentTasks.sort(compareDates);
  const nextUrgentDate = urgentTasks[0].date;
  const formattedDate = nextUrgentDate.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  const urgentDate = document.getElementById("urgentDate");
  urgentDate.textContent = `${formattedDate}`;
}

/** help function for nextUrgent, the timestamp of each date is extracted with getTime() & the difference between the timestamps is returned */
function compareDates(a, b) {
  a = new Date(a.date);
  b = new Date(b.date);
  return a.getTime() - b.getTime();
}

/**
 * counts the tasks with the same category together
 * @param {string} status taskstatus
 * @param {number} id for the html tag
 * @param {string} key for the object
 */
function isPluralOrNot(status, id, key) {
  let container = document.getElementById(id);
  container.innerHTML = '';
  let tasksToCheck = 0;
  for (let i = 0; i < tasks.length; i++) {
    const taskStatus = tasks[i][key];
    if (taskStatus.toLowerCase() == status.toLowerCase()) {
      tasksToCheck++;
    }
  }
  printTaskString(container, status, tasksToCheck);
}

/**
 * counts all tasks
 */
function getAllTasks() {
  let container = document.getElementById('allTasksSum');
  container.innerHTML = '';
  let status = 'in Board';
  let allTasks = tasks.length;
  printTaskString(container, status, allTasks);
}

/**
 * call functions with differt params
 */
function fillCorrectPlural() {
  isPluralOrNot('Done', 'tasksDoneSum', 'status');
  isPluralOrNot('Await feedback', 'tasksFeedbackSum', 'status');
  isPluralOrNot('In progress', 'tasksProgressSum', 'status');
  isPluralOrNot('To Do', 'tasksTodoSum', 'status');
  isPluralOrNot('Urgent', 'urgentTasksSum', 'priority');
  getAllTasks();
}

/**
 * print the html, with task or tasks
 * @param {*} container 
 * @param {*} status 
 * @param {*} tasksToCheck 
 */
function printTaskString(container, status, tasksToCheck) {
  if (tasksToCheck == 1) {
    container.innerHTML += `Task ${status}`;
  } else {
    container.innerHTML += `Tasks ${status}`;
  }
}