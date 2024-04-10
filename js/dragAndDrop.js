let all;
const todo = document.getElementById('toDoContainer');
const progress = document.getElementById('inProgressContainer');
const feedback = document.getElementById('awaitFeedbackContainer');
const done = document.getElementById('doneContainer');
let todoPos = todo.getBoundingClientRect();
let progressPos = progress.getBoundingClientRect();
let feedbackPos = feedback.getBoundingClientRect();
let donePos = done.getBoundingClientRect();
let elementToDrag;
let startX;
let startY;
let offsetX;
let offsetY;
let touchMoveEnabled = false;
let touchMoved = false;
let timeoutID;

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

/**
 * start touch events for all tasks with class todoBox
 */
function startTouchEvents() {
    all = document.querySelectorAll('.todoBox');
    all.forEach(addStart);
}

/**
 * hightlight the area for touchend
 * @param {string} area 
 */
function highlightArea(area) {
    removeAllHighlight();
    area.classList.add('dragAreaHighlight');
}

/**
 * remove highligt from all areas
 */
function removeAllHighlight() {
    todo.classList.remove('dragAreaHighlight');
    progress.classList.remove('dragAreaHighlight');
    feedback.classList.remove('dragAreaHighlight');
    done.classList.remove('dragAreaHighlight');
}

/**
 * update the position from the target areas
 */
function updatePositions() {
    todoPos = todo.getBoundingClientRect();
    progressPos = progress.getBoundingClientRect();
    feedbackPos = feedback.getBoundingClientRect();
    donePos = done.getBoundingClientRect();
}

/**
 * activate event listener for touch events
 * @param {*} elem 
 */
function addStart(elem) {
    let id = elem.id.slice(-1); // id for the task
    let taskToMove = tasks[id]; // movable task
    elem.addEventListener('touchstart', e => {
        handleTouchStart(elem, e);
        elem.addEventListener('touchmove', eve => {
            handleTouchMove(eve, elem);
        });
        elem.addEventListener('touchend', eve => {
            handleTouchEnd(elem, id, taskToMove);
        });
    });
}

/**
 * set startpoints and offset coordinates, set timeout and rotate task after timeout
 * @param {*} elem 
 * @param {*} e 
 */
function handleTouchStart(elem, e) {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
    updatePositions();
    offsetX = elem.offsetLeft;
    offsetY = elem.offsetTop;
    e.preventDefault();
    timeoutID = setTimeout(() => {
        touchMoveEnabled = true;
        elem.style.transform = 'rotate(5deg)';
    }, '500');
}

/**
 * handel touch move, hightlight areas
 * @param {*} eve 
 * @param {*} elem 
 */
function handleTouchMove(eve, elem) {
    eve.preventDefault();
    if (touchMoveEnabled) {
        setNewPositions(elem, eve);
        if (isElementInside(progressPos, elem)) highlightArea(progress);
        else if (isElementInside(feedbackPos, elem)) highlightArea(feedback);
        else if (isElementInside(donePos, elem)) highlightArea(done);
        else if (isElementInside(todoPos, elem)) highlightArea(todo);
        else removeAllHighlight();
    }
}

/**
 * set new positions for moving task
 * @param {*} elem 
 * @param {*} eve 
 */
function setNewPositions(elem, eve) {
    touchMoved = true;
    let nextX = eve.changedTouches[0].clientX;
    let nextY = eve.changedTouches[0].clientY;
    elem.style.position = 'absolute';
    elem.style.left = (nextX - startX + offsetX) + 'px';
    elem.style.top = (nextY - startY + offsetY) + 'px';
    elem.style.zIndex = 15;
}

/**
 * handle touch end, show detail box or move task
 * @param {*} elem 
 * @param {*} id 
 * @param {*} taskToMove 
 */
function handleTouchEnd(elem, id, taskToMove) {
    clearTimeout(timeoutID);           
    elem.style.zIndex = 0;
    if (!touchMoveEnabled && !touchMoved) {        
        showDetailBox(id);                        
    } else {                                       
        moveTask(elem, taskToMove);
    }
    touchMoveEnabled = false;
    touchMoved = false;
}

/**
 * check drop area
 * @param {*} elem 
 * @param {*} taskToMove 
 */
function moveTask(elem, taskToMove) {
    if (isElementInside(progressPos, elem)) {
        dropElementInDiv(elem, 'In progress', taskToMove);
    } else if (isElementInside(feedbackPos, elem)) {
        dropElementInDiv(elem, 'Await feedback', taskToMove);
    } else if (isElementInside(donePos, elem)) {
        dropElementInDiv(elem, 'Done', taskToMove)
    } else if (isElementInside(todoPos, elem)) {
        dropElementInDiv(elem, 'To Do', taskToMove);
    } else {
        resetElement(elem);
        hideDetailBox();
    }
}

/**
 * checking whether the element is in an area
 * @param {*} container 
 * @param {*} element 
 * @returns 
 */
function isElementInside(container, element) {
    if (getCenterX(element) > container.left && getCenterX(element) < container.right && getCenterY(element) > container.top && getCenterY(element) < container.bottom) {
        return true;
    } else {
        return false;
    }
}

/**
 * reset Element and start touchEvents again
 * @param {*} elem 
 */
function resetElement(elem) {
    resetElementPos(elem);
    elem.style.transform = 'rotate(0deg)';
    removeAllHighlight();
    startTouchEvents();
}

/**
 * move task to new area
 * @param {*} elem 
 * @param {*} status 
 * @param {*} taskToMove 
 */
function dropElementInDiv(elem, status, taskToMove) {
    taskToMove['status'] = status;
    resetElementPos(elem);
    checkRenderTasks();
    removeAllHighlight();
    startTouchEvents();
}

/**
 * 
 * @param {*} element 
 * @returns Center Position in X
 */
function getCenterX(element) {
    let rect = element.getBoundingClientRect();
    let centerX = rect.left + (rect.width / 2);
    return centerX;
}

/**
 * 
 * @param {*} element 
 * @returns Center Position in Y
 */
function getCenterY(element) {
    let rect = element.getBoundingClientRect();
    let centerY = rect.top + (rect.height / 2);
    return centerY;
}

/**
 * reset Task back to Position: static and left and top 0
 * @param {*} elem 
 */
function resetElementPos(elem) {
    elem.style.position = 'static';
    elem.style.left = 0 + "px";
    elem.style.top = 0 + "px";
}