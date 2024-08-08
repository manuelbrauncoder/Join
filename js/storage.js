/**
 * @file storage.js
 * This file is used to handle the storage of the application * 
 */
const STORAGE_TOKEN = 'OH2O2V56JBFNAYI3VP8UZKZ21D6NA1XGM5392R04';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

const FIRE_URL = 'https://join-84df0-default-rtdb.europe-west1.firebasedatabase.app/';
let fireTasks = [];
/**
 * put data to firebase storage
 * @param {string} path for the firebase storage / ('users' or 'tasks')
 * @param {object} data 
 */
async function putData(path = '', data = {}) {
  try {
    let response = await fetch(FIRE_URL + path + '.json', {
      method: "put",
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.log(error);
  }  
}

/**
 * generate id for firebase, and put data to firebase
 * @param {string} path for firebase
 * @param {*} arr to upload
 */
async function prepareDataForUpload(path, arr) {
  await deleteStorage(path);
  let id = 0;
  arr.forEach(data => {
    putData(`${path}/${id}`, data);
    id++;
  })
  console.log(arr);
}

/**
 * generate id for firebase, and put data to firebase
 * @param {string} path for firebase
 * @param {Array} arr choose array for upload, localUsers for fallback, or users
 */
// async function prepareUserDataForUpload(path, arr) {
//   await deleteStorage(path);
//   let id = 0;
//   arr.forEach(user => {
//     putData(`users/${id}`, user);
//     id++;
//   })
//   console.log(arr);
// }

async function deleteStorage(path = "") {
  let response = await fetch(FIRE_URL + path + '.json',{
    method: "Delete"
  });
}


async function loadUsers() {
  let path = 'users';
  try {
    let response = await fetch(FIRE_URL + path + '.json');
    let responseToJson = await response.json();
    let keyArr = Object.keys(responseToJson);
    let cache = [];
    let cleanArr = [];
    for (let i = 0; i < keyArr.length; i++) {
      const key = keyArr[i];
      cache.push({ user: responseToJson[key] });
    }
    cleanArr = cache.map(item => item.user);
    users = cleanArr.length > 0 ? cleanArr : localUsers.slice();
  } catch (error) {
    console.log('error fetching data:', error);
    users = localUsers.slice();
    
  }
}

async function loadTasks() {
  path = 'tasks';
  try {
    let response = await fetch(FIRE_URL + path + '.json');
    let responseToJson = await response.json();
    let keyArr = Object.keys(responseToJson);
    let cache = [];
    let cleanArr = [];
    for (let i = 0; i < keyArr.length; i++) {
      const key = keyArr[i];
      cache.push({ task: responseToJson[key] });
    }
    cleanArr = cache.map(item => item.task);
    tasks = cleanArr.length > 0 ? cleanArr : localTasks.slice();
  } catch (error) {
    console.log('error fetching data:', error);
    tasks = localTasks.slice();
  }
}

/**
 * Uploads data into the backend.
 * @param {key} key - data name (key)
 * @param {array} value - data array to upload
 * @returns - promise
 */
async function setItem_OLD(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}

/**
 * Fetches data from the backend.
 * @param {key} key - key name to fetch
 * @returns - promise + JSON
 */
async function getItem_OLD(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json()).then(res => {
    if (res.data) {
      return res.data.value;
    } throw `Could not find data with key "${key}".`;
  });
}

/**
 * Logs the user out by clearing the session storage and calling the unrememberMe function.
 */
function logout() {
  sessionStorage.clear();
  unrememberMe();
}

/** predefined users */
let localUsers = [
  {
    "name": "Guest",
    "email": "guest@guest.de",
    "password": "12345",
    "bg": "rgb(30,60,17)",
  },
  {
    "name": "Tim Cook",
    "email": "tim.cook@example.com",
    "password": "Cook#Apple5",
    "phone": "017852546",
    "bg": "rgb(44,75,17)",
  },
  {
    "name": "Steve Jobs",
    "email": "steve.jobs@example.com",
    "password": "Jobs#Apple1",
    "phone": "017852546",
    "bg": "rgb(124,169,74)",

  },
  {
    "name": "Bill Gates",
    "email": "bill.gates@example.com",
    "password": "Gates@Microsoft2",
    "phone": "017852546",
    "bg": "rgb(7,122,50)",
  },
  {
    "name": "Linus Torvalds",
    "email": "linus.torvalds@example.com",
    "password": "Torvalds#Linux3",
    "phone": "017852546",
    "bg": "rgb(47,57,103)",
  },
  {
    "name": "Sam Altman",
    "email": "sam.altman@example.com",
    "password": "Altman#YCombinator4",
    "phone": "017852546",
    "bg": "rgb(22,7120,160)",
  }
];

/** predefined tasks */
let localTasks = [
  {
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommandation.",
    "date": "Sat Mar 16 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Medium",
    "assignedTo": ["Linus Torvalds", "Sam Altman"],
    "category": "User Story",
    "subtasks": [
      {
        "name": "Implement Recipe Recommendation",
        "done": false
      },
      {
        "name": "Style Recipe",
        "done": true
      }],
    "status": "In progress"
  },
  {
    "title": "HTML Base Template Creation",
    "description": "Create reusable HTML base templates.",
    "date": "Sat Mar 17 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Urgent",
    "assignedTo": ["Tim Cook", "Bill Gates"],
    "category": "Technical Task",
    "subtasks": [
      {
        "name": "Add CSS",
        "done": false
      },
      {
        "name": "Clean Code",
        "done": true
      }],
    "status": "In progress"
  },
  {
    "title": "Design Database Schema",
    "description": "Create database structure for the application.",
    "date": "Mon Mar 19 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Medium",
    "assignedTo": ["Linus Torvalds", "Bill Gates"],
    "category": "Technical Task",
    "subtasks": [],
    "status": "In progress"
  },
  {
    "title": "UI/UX Enhancement",
    "description": "Improve user interface and experience.",
    "date": "Tue Mar 20 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Low",
    "assignedTo": ["Linus Torvalds", "Bill Gates"],
    "category": "User Story",
    "subtasks": [
      {
        "name": "Update color scheme",
        "done": false
      },
      {
        "name": "Optimize navigation menu",
        "done": true
      },
      {
        "name": "Style Sidebar",
        "done": false
      }],
    "status": "Await feedback"
  },
  {
    "title": "Implement User Authentication",
    "description": "Develop login and registration functionality.",
    "date": "Sun Mar 18 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Urgent",
    "assignedTo": ["Linus Torvalds", "Tim Cook"],
    "category": "Technical Task",
    "subtasks": [
      {
        "name": "Create login form",
        "done": false
      },
      {
        "name": "Implement user registration",
        "done": true
      },
      {
        "name": "Style login form",
        "done": false
      }],
    "status": "To Do"
  }
];

/**
 * Resets the storage if shift key is pressed during the event. *
 * @param {Event} event - The event triggering the function
 */
async function resetStorage(event) {
  resetButton = document.getElementById('resetStorage');
  if (event.shiftKey) {
    const confirmation = confirm("Are you sure you want to reset remote storage? This action cannot be undone.");
    if (confirmation) {
      //setItem('users', JSON.stringify(localUsers));
      //setItem('tasks', JSON.stringify(localTasks));
      //await deleteStorage("users");
      //await deleteStorage("tasks");
      await prepareDataForUpload('users', localUsers);
      await prepareDataForUpload('tasks', localTasks);
      alert('remote Storage is resetet!');
      location.reload();
    }
  }
}

/**
 * Asynchronously loads users data, handling errors by falling back to local data.
 */
async function loadUsers_OLD() {
  try {
    const usersJSON = await getItem('users');
    users = usersJSON ? JSON.parse(usersJSON) : localUsers.slice();
    console.log('Loaded Users:', users);
    
  } catch (e) {
    console.error('Loading error:', e);
    users = localUsers.slice();
  }
}

/**
 * Loads tasks from storage and initializes the tasks array.
 * @return {Promise<void>} 
 */
async function loadTasks_OLD() {
  try {
    const tasksJSON = await getItem('tasks');
    tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    console.log('Loaded Tasks:', tasks);
    
  } catch {
    tasks = [];
  }
}

/**
 * Saves tasks by converting them to a JSON string and storing them in local storage.
 * @param {Array} tasks - The tasks to be saved.
 * @return {Promise} A promise that resolves after saving the tasks.
 */
async function saveTasks_OLD(tasks) {
  await setItem('tasks', JSON.stringify(tasks));
}
