
let elementToDrag;


/**
 * start with dragging
 * @param {*} id 
 */
function startDragging(id) {
    elementToDrag = id;
}

/**
 * prevent default
 * @param {*} event 
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * move task to new status
 * @param {*} category 
 */
async function moveTo(category) {
    tasks[elementToDrag]['status'] = category;
    renderTasksInBoard();
    await saveTasks(tasks);
}

/**
 * set highligt for droppable area
 * @param {*} id 
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

/**
 * remove highlight
 * @param {*} id 
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

// new below

function getElementById(id) {
    let element = document.getElementById(id);
    return element;
}

function showTaskMoveWidget(event, index) {
    event.stopPropagation();
    let element = getElementById(`moveWidget${index}`)
    element.classList.toggle('d-none');
    renderMoves(index, element);
}

let possibleMoves;

function renderMoves(index, element) {
    possibleMoves = ['To Do', 'In progress', 'Await feedback', 'Done'];
    let currentState = tasks[index]['status'];
    removeCurrentState(currentState);
    element.innerHTML = '';
    for (let i = 0; i < possibleMoves.length; i++) {
        const moveToState = possibleMoves[i];
            element.innerHTML += printMoves(moveToState, i, index);
    }
}

function printMoves(moveToState, i, index) {
    return /*html*/ `
        <span onclick="changeState(event, ${i}, ${index})" class="moveToElement">${moveToState}</span>
    `;
}

async function changeState(event, i, index) {
    event.stopPropagation();
    let newState = possibleMoves[i];
    tasks[index]['status'] = newState;
    renderTasksInBoard();
    await saveTasks(tasks);
}

function removeCurrentState(currentState) {
    let index = possibleMoves.indexOf(currentState);
    possibleMoves.splice(index, 1);
}