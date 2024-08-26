/**
 * @file storage.js
 * This file is used to handle the storage of the application * 
 */
const STORAGE_TOKEN = 'OH2O2V56JBFNAYI3VP8UZKZ21D6NA1XGM5392R04';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Uploads data into the backend.
 * @param {key} key - data name (key)
 * @param {array} value - data array to upload
 * @returns - promise
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}

/**
 * Fetches data from the backend.
 * @param {key} key - key name to fetch
 * @returns - promise + JSON
 */
async function getItem(key) {
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
    "email": "guest@user.com",
    "password": "7236477",
    "phone": "+49 175 554444",
    "bg": "rgb(204, 204, 153)"
  },
  {
    "name": "Anna Schmidt",
    "email": "anna.schmidt@example.com",
    "password": "SicheresPasswort123!",
    "phone": "+49 171 1234567",
    "bg": "rgb(204, 153, 153)"
  },
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "MySecurePassword2024#",
    "phone": "+1 202 555 0198",
    "bg": "rgb(153, 204, 178)"
  },
  {
    "name": "Maria Müller",
    "email": "maria.mueller@example.com",
    "password": "Passwort!987",
    "phone": "+49 30 9876543",
    "bg": "rgb(204, 204, 153)"
  },
  {
    "name": "David Johnson",
    "email": "david.johnson@example.com",
    "password": "P@sswordSecure456",
    "phone": "+44 20 7946 0958",
    "bg": "rgb(153, 153, 204)"
  },
  {
    "name": "Laura Fischer",
    "email": "laura.fischer@example.com",
    "password": "LauraPasswort#456",
    "phone": "+49 89 1234567",
    "bg": "rgb(204, 178, 153)"
  },
  {
    "name": "Michael Brown",
    "email": "michael.brown@example.com",
    "password": "BrownsP@ssw0rd!",
    "phone": "+1 212 555 0110",
    "bg": "rgb(178, 153, 204)"
  }
];

/** predefined tasks */
let localTasks = [
  {
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "date": "Sat Mar 16 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Medium",
    "assignedTo": ["Anna Schmidt", "John Doe"],
    "category": "User Story",
    "subtasks": [
      {
        "name": "Implement Recipe Recommendation",
        "done": false
      },
      {
        "name": "Style Recipe",
        "done": true
      }
    ],
    "status": "In progress"
  },
  {
    "title": "HTML Base Template Creation",
    "description": "Create reusable HTML base templates.",
    "date": "Sat Mar 17 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Urgent",
    "assignedTo": ["Maria Müller", "David Johnson"],
    "category": "Technical Task",
    "subtasks": [
      {
        "name": "Add CSS",
        "done": false
      },
      {
        "name": "Clean Code",
        "done": true
      }
    ],
    "status": "In progress"
  },
  {
    "title": "Design Database Schema",
    "description": "Create database structure for the application.",
    "date": "Mon Mar 19 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Medium",
    "assignedTo": ["Laura Fischer", "David Johnson"],
    "category": "Technical Task",
    "subtasks": [],
    "status": "In progress"
  },
  {
    "title": "UI/UX Enhancement",
    "description": "Improve user interface and experience.",
    "date": "Tue Mar 20 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Low",
    "assignedTo": ["Michael Brown", "Anna Schmidt"],
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
      }
    ],
    "status": "Await feedback"
  },
  {
    "title": "Implement User Authentication",
    "description": "Develop login and registration functionality.",
    "date": "Sun Mar 18 2024 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)",
    "priority": "Urgent",
    "assignedTo": ["Michael Brown", "Laura Fischer"],
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
      }
    ],
    "status": "To Do"
  }
];

/**
 * Resets the storage if shift key is pressed during the event. *
 * @param {Event} event - The event triggering the function
 */
function resetStorage(event) {
  resetButton = document.getElementById('resetStorage');
  if (event.shiftKey) {
    const confirmation = confirm("Are you sure you want to reset remote storage? This action cannot be undone.");
    if (confirmation) {
      setItem('users', JSON.stringify(localUsers));
      setItem('tasks', JSON.stringify(localTasks));
      alert('remote Storage is resetet!');
      location.reload();
    }
  }
}

/**
 * Asynchronously loads users data, handling errors by falling back to local data.
 */
async function loadUsers() {
  try {
    const usersJSON = await getItem('users');
    users = usersJSON ? JSON.parse(usersJSON) : localUsers.slice();
  } catch (e) {
    console.error('Loading error:', e);
    users = localUsers.slice();
  }
}

/**
 * Loads tasks from storage and initializes the tasks array.
 * @return {Promise<void>} 
 */
async function loadTasks() {
  try {
    const tasksJSON = await getItem('tasks');
    tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch {
    tasks = [];
  }
}

/**
 * Saves tasks by converting them to a JSON string and storing them in local storage.
 * @param {Array} tasks - The tasks to be saved.
 * @return {Promise} A promise that resolves after saving the tasks.
 */
async function saveTasks(tasks) {
  await setItem('tasks', JSON.stringify(tasks));
}
