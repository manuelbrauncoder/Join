
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



