function printAddTask() {
    return /*html*/ `
        <form id="addTaskForm" class="addTaskForm" onsubmit="addTask(); return false">
            <input type="text" placeholder="Enter a title" required id="title" class="title-input">
            <label class="subHeadlineAddTask" for="description"><b>Description</b> (optional)</label>
            <div class="textAreaAddTask">
                <img src="/assets/img/textAreaIcon.png" alt="">
                <textarea name="" id="description" class="description-input" placeholder="Enter a Description"></textarea>
            </div>
            <label class="subHeadlineAddTask" for="date"><b>Due date</b></label>
            <input type="date" id="date" class="date-input" required>
        </form>
        <div class="priority">
            <span class="subHeadlineAddTask">Priority</span>
            <div>
                <div onclick="setPriority('urgent')" id="prioUrgent" class="priorityBox prioUrgent">
                    <span>Urgent</span>
                    <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.9041 14.7547C18.6695 14.7551 18.441 14.6803 18.2521 14.5412L10 8.458L1.74797 14.5412C1.63212 14.6267 1.50054 14.6887 1.36073 14.7234C1.22093 14.7582 1.07565 14.7651 0.933183 14.7437C0.790715 14.7223 0.653851 14.6732 0.530406 14.599C0.406961 14.5247 0.299352 14.427 0.213723 14.3112C0.128094 14.1954 0.0661217 14.0639 0.031345 13.9243C-0.00343163 13.7846 -0.0103318 13.6394 0.0110384 13.497C0.0541974 13.2095 0.209888 12.9509 0.44386 12.7781L9.34797 6.20761C9.53667 6.06802 9.76524 5.99268 10 5.99268C10.2348 5.99268 10.4634 6.06802 10.6521 6.20761L19.5562 12.7781C19.7421 12.915 19.88 13.1071 19.9501 13.327C20.0203 13.5469 20.0191 13.7833 19.9468 14.0025C19.8745 14.2216 19.7348 14.4124 19.5475 14.5475C19.3603 14.6826 19.1351 14.7551 18.9041 14.7547Z"
                            fill="#FF3D00" />
                        <path
                            d="M18.9041 9.00568C18.6695 9.00609 18.441 8.93124 18.2521 8.79214L10 2.70898L1.74797 8.79214C1.514 8.96495 1.22091 9.0378 0.933188 8.99468C0.645461 8.95155 0.386663 8.79597 0.213727 8.56218C0.0407916 8.32838 -0.0321162 8.03551 0.0110429 7.74799C0.0542019 7.46048 0.209892 7.20187 0.443864 7.02906L9.34797 0.458588C9.53667 0.318997 9.76525 0.243652 10 0.243652C10.2348 0.243652 10.4634 0.318997 10.6521 0.458588L19.5562 7.02906C19.7421 7.16598 19.88 7.35809 19.9501 7.57797C20.0203 7.79785 20.0191 8.03426 19.9468 8.25344C19.8745 8.47262 19.7348 8.66338 19.5475 8.79847C19.3603 8.93356 19.1351 9.00608 18.9041 9.00568Z"
                            fill="#FF3D00" />
                    </svg>
                </div>
                <div onclick="setPriority('medium')" id="prioMedium" class="priorityBox prioMedium">
                    <span>Medium</span>
                    <svg width="20" height="9" viewBox="0 0 20 9" fill="" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_36481_4722)">
                            <path
                                d="M18.9041 8.22528H1.09589C0.805242 8.22528 0.526498 8.10898 0.320979 7.90197C0.11546 7.69495 0 7.41419 0 7.12143C0 6.82867 0.11546 6.5479 0.320979 6.34089C0.526498 6.13388 0.805242 6.01758 1.09589 6.01758H18.9041C19.1948 6.01758 19.4735 6.13388 19.679 6.34089C19.8845 6.5479 20 6.82867 20 7.12143C20 7.41419 19.8845 7.69495 19.679 7.90197C19.4735 8.10898 19.1948 8.22528 18.9041 8.22528Z"
                                fill="orange" />
                            <path
                                d="M18.9041 2.98211H1.09589C0.805242 2.98211 0.526498 2.86581 0.320979 2.6588C0.11546 2.45179 0 2.17102 0 1.87826C0 1.5855 0.11546 1.30474 0.320979 1.09772C0.526498 0.890712 0.805242 0.774414 1.09589 0.774414L18.9041 0.774414C19.1948 0.774414 19.4735 0.890712 19.679 1.09772C19.8845 1.30474 20 1.5855 20 1.87826C20 2.17102 19.8845 2.45179 19.679 2.6588C19.4735 2.86581 19.1948 2.98211 18.9041 2.98211Z"
                                fill="orange" />
                        </g>
                        <defs>
                            <clipPath id="clip0_36481_4722">
                                <rect width="20" height="7.45098" fill="orange" transform="translate(0 0.774414)" />
                            </clipPath>
                        </defs>
                    </svg>    
                </div>
                <div onclick="setPriority('low')" id="prioLow" class="priorityBox prioLow">
                    <span>Low</span>
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.5 9.00589C10.2654 9.0063 10.0369 8.93145 9.84802 8.79238L0.944913 2.22264C0.829075 2.13708 0.731235 2.02957 0.65698 1.90623C0.582724 1.78289 0.533508 1.64614 0.51214 1.50379C0.468986 1.21631 0.541885 0.923473 0.714802 0.689701C0.887718 0.455928 1.14649 0.300371 1.43418 0.257248C1.72188 0.214126 2.01493 0.286972 2.24888 0.45976L10.5 6.54224L18.7511 0.45976C18.867 0.374204 18.9985 0.312285 19.1383 0.277538C19.2781 0.242791 19.4234 0.235896 19.5658 0.257248C19.7083 0.2786 19.8451 0.32778 19.9685 0.401981C20.092 0.476181 20.1996 0.573948 20.2852 0.689701C20.3708 0.805453 20.4328 0.936923 20.4676 1.07661C20.5023 1.21629 20.5092 1.36145 20.4879 1.50379C20.4665 1.64614 20.4173 1.78289 20.343 1.90623C20.2688 2.02957 20.1709 2.13708 20.0551 2.22264L11.152 8.79238C10.9631 8.93145 10.7346 9.0063 10.5 9.00589Z"
                            fill="#7AE229" />
                        <path
                            d="M10.5 14.7544C10.2654 14.7548 10.0369 14.68 9.84802 14.5409L0.944913 7.97117C0.710967 7.79839 0.555294 7.53981 0.51214 7.25233C0.468986 6.96485 0.541886 6.67201 0.714802 6.43824C0.887718 6.20446 1.14649 6.04891 1.43418 6.00578C1.72188 5.96266 2.01493 6.03551 2.24888 6.2083L10.5 12.2908L18.7511 6.2083C18.9851 6.03551 19.2781 5.96266 19.5658 6.00578C19.8535 6.04891 20.1123 6.20446 20.2852 6.43824C20.4581 6.67201 20.531 6.96485 20.4879 7.25233C20.4447 7.53981 20.289 7.79839 20.0551 7.97117L11.152 14.5409C10.9631 14.68 10.7346 14.7548 10.5 14.7544Z"
                            fill="#7AE229" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="category overFlowYAuto listenDropDown">
            <span class="subHeadlineAddTask">Assigned to (optional)</span>
            <div>
                <div class="customSelect" id="searchUserBtn">
                    <input onclick="showSearchUserInput()" type="text" name="" id="searchUserInput" autocomplete="off" onkeyup="searchUsers()"placeholder="Select contacts to assign">                            
                    <svg onclick="showSearchUserInput()" id="dropDownImg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_38112_7992" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                        <rect x="0.682129" y="0.396729" width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_38112_7992)">
                        <path d="M11.9821 14.6967L9.38213 12.0967C9.06546 11.7801 8.99463 11.4176 9.16963 11.0092C9.34463 10.6009 9.65713 10.3967 10.1071 10.3967H15.2571C15.7071 10.3967 16.0196 10.6009 16.1946 11.0092C16.3696 11.4176 16.2988 11.7801 15.9821 12.0967L13.3821 14.6967C13.2821 14.7967 13.1738 14.8717 13.0571 14.9217C12.9405 14.9717 12.8155 14.9967 12.6821 14.9967C12.5488 14.9967 12.4238 14.9717 12.3071 14.9217C12.1905 14.8717 12.0821 14.7967 11.9821 14.6967Z" fill="#4589FF"/>
                        </g>
                    </svg>
                    <svg onclick="hideSearchUserInput()" id="dropUpImg" class="d-none" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.69954 0.299975L7.29954 2.89998C7.6162 3.21664 7.68704 3.57914 7.51204 3.98748C7.33704 4.39581 7.02454 4.59998 6.57454 4.59998L1.42454 4.59998C0.974536 4.59998 0.662037 4.39581 0.487037 3.98748C0.312037 3.57914 0.38287 3.21664 0.699537 2.89998L3.29954 0.299975C3.39954 0.199975 3.50787 0.124976 3.62454 0.0749755C3.7412 0.0249753 3.8662 -2.43187e-05 3.99954 -2.43187e-05C4.13287 -2.43187e-05 4.25787 0.0249753 4.37454 0.0749755C4.4912 0.124976 4.59954 0.199975 4.69954 0.299975Z" fill="#4589FF"/>
                    </svg>
                </div>
                <hr class="dividerHorizontal">
                <div id="selectedUser"></div>
                <div id="userCategory" class="options d-none"></div>
            </div>
        </div>
        <div class="category listenDropDown">
            <span class="subHeadlineAddTask">Category</span>
            <div>
                <div onclick="toggleTaskCategory()" class="customSelect catCon" id="taskCategoryField">
                    <input form="addTaskForm" type="text" name="" id="selectedCategory" placeholder="Select task category" required autocomplete="off">
                    <svg id="dropDownImgCategory" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_38112_7992" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                        <rect x="0.682129" y="0.396729" width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_38112_7992)">
                        <path d="M11.9821 14.6967L9.38213 12.0967C9.06546 11.7801 8.99463 11.4176 9.16963 11.0092C9.34463 10.6009 9.65713 10.3967 10.1071 10.3967H15.2571C15.7071 10.3967 16.0196 10.6009 16.1946 11.0092C16.3696 11.4176 16.2988 11.7801 15.9821 12.0967L13.3821 14.6967C13.2821 14.7967 13.1738 14.8717 13.0571 14.9217C12.9405 14.9717 12.8155 14.9967 12.6821 14.9967C12.5488 14.9967 12.4238 14.9717 12.3071 14.9217C12.1905 14.8717 12.0821 14.7967 11.9821 14.6967Z" fill="#4589FF"/>
                        </g>
                    </svg>
                </div>
                <hr class="dividerHorizontal">
                <div id="taskCategory" class="options d-none">
                    <span id="cat1" onclick="selectCategory('Technical Task')">Technical Task</span>
                    <span id="cat2" onclick="selectCategory('User Story')">User Story</span>
                </div>
            </div>
        </div>
        <div class="category">
            <span class="subHeadlineAddTask">Subtasks (optional)</span>
            <div onclick="showSubtaskInput()" class="subtask" id="addSubTaskBtn">
                <input type="text" name="" id="subtaskInput" placeholder="Add new subtask" autocomplete="off">
                <img class="addClosePlusIcons" id="plusIcon" src="./assets/img/add.png" alt="">
                <div id="checkAndCloseIcons" class="checkAndCloseIcons d-none">            
                    <svg class="addClosePlusIcons" onclick="addSubTasks(event)" width="16" height="13" viewBox="0 0 16 13"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.54996 9.65L14.025 1.175C14.225 0.975 14.4625 0.875 14.7375 0.875C15.0125 0.875 15.25 0.975 15.45 1.175C15.65 1.375 15.75 1.6125 15.75 1.8875C15.75 2.1625 15.65 2.4 15.45 2.6L6.24996 11.8C6.04996 12 5.81663 12.1 5.54996 12.1C5.2833 12.1 5.04996 12 4.84996 11.8L0.549963 7.5C0.349963 7.3 0.25413 7.0625 0.262463 6.7875C0.270796 6.5125 0.374963 6.275 0.574963 6.075C0.774963 5.875 1.01246 5.775 1.28746 5.775C1.56246 5.775 1.79996 5.875 1.99996 6.075L5.54996 9.65Z"
                            fill="#4589FF" />
                    </svg>            
                    <hr class="dividerVertical">    
                    <svg class="addClosePlusIcons" onclick="hideSubtaskInput(event)" width="14" height="14"
                        viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.9995 8.40005L2.0995 13.3C1.91617 13.4834 1.68283 13.575 1.3995 13.575C1.11617 13.575 0.882833 13.4834 0.6995 13.3C0.516166 13.1167 0.4245 12.8834 0.4245 12.6C0.4245 12.3167 0.516166 12.0834 0.6995 11.9L5.5995 7.00005L0.6995 2.10005C0.516166 1.91672 0.4245 1.68338 0.4245 1.40005C0.4245 1.11672 0.516166 0.883382 0.6995 0.700049C0.882833 0.516715 1.11617 0.425049 1.3995 0.425049C1.68283 0.425049 1.91617 0.516715 2.0995 0.700049L6.9995 5.60005L11.8995 0.700049C12.0828 0.516715 12.3162 0.425049 12.5995 0.425049C12.8828 0.425049 13.1162 0.516715 13.2995 0.700049C13.4828 0.883382 13.5745 1.11672 13.5745 1.40005C13.5745 1.68338 13.4828 1.91672 13.2995 2.10005L8.3995 7.00005L13.2995 11.9C13.4828 12.0834 13.5745 12.3167 13.5745 12.6C13.5745 12.8834 13.4828 13.1167 13.2995 13.3C13.1162 13.4834 12.8828 13.575 12.5995 13.575C12.3162 13.575 12.0828 13.4834 11.8995 13.3L6.9995 8.40005Z"
                            fill="#4589FF" />
                    </svg>            
                </div>
            </div>
            <hr class="dividerHorizontal">
            <div id="subTaskContainer" class="subtask-input"></div>            
        </div>`;
}

function printDetails(task, index) {
    return /*html*/ `
       <div class="taskDetails">
          <div class="categoryAndClose">
             <span class="todoCategory" id="detailCategory${index}">${task.category}</span>
             <img class="cp" onclick="hideDetailBox()" src="./assets/img/close.png" alt="close icon">
          </div>
          <h1 class="detailTitle">${task.title}</h1>
          <span class="openSans400-19">${task.description}</span>
          <div class="dateAndPrio">
             <span class="keyString">Due date:</span>
             <span class="openSans400-19">${getFormatedDate(task.date)}</span>
          </div>
          <div class="dateAndPrio">
             <span class="keyString">Priority:</span>
             <div class="dateAndIcons">
                <span class="openSans400-19">${task.priority}</span>
                <img class="prioIconBoard" src="${getPrioIcon(task.priority)}" alt="">
             </div>
          </div>
          <div id="assignedToDetailBox" class="assignedToDetailBox">
             <span class="keyString">Assigned To:</span>
             <div>
             <div class="assignedToDetailView" id="assignedToDetailView${index}"></div>
             <div class="toMuchDetailView" id="toMuchDetailContacts${index}"></div>
             </div>
          </div>
          <div id="subtaskDetailBox" class="assignedToDetailBox">
             <span class="keyString">Subtasks</span>
             <div id="subTasksDetailViewBox${index}" class="assignedToDetailView"></div>
          </div>
          <div class="detailViewOptions">
             <div onclick="deleteTask(${index})">
                <img src="./assets/img/delete.png" alt="">
                <span>Delete</span>
             </div>
             <img src="./assets/img/divider_vertical.png" alt="">
             <div onclick="editTask(${index})">
                <img src="./assets/img/edit.png" alt="">
                <span>Edit</span>
             </div>
          </div>
       </div>`;
}

function printAssignedToDetails(contact, contactId) {
    return /*html*/ `
        <div class="assignedToDetails">
            <span class="contactBubble" id="${contactId}">${getInitials(contact)}</span>
            <span class="openSans400-19">${contact}</span>
        </div>`;
}

function printTasksInBoard(task, index, subTasksLength) {
    return /*html*/ `
        <div id="todobox${index}" onclick="showDetailBox(${index})" class="todoBox cp" draggable="true" ondragstart="startDragging(${index})">
        <div id="moveWidget${index}" class="moveWidget isHidden">
            <span class="moveHeadline">Move to:</span>    
            <div class="moveTextBox" id="moveText${index}"></div>
        </div>
            <div class="firstLine">
                <div class="todoCategory" id="todoCategory${index}">${task.category}</div>
                <div onclick="showTaskMoveWidget(event, ${index})">
                    <label class="hamburger-menu">
                        <input id="input-burger${index}" type="checkbox" disabled>
                    </label>
                </div>
            </div>                         
            <div id="todoTitle"><h2 class="colorMain2">${task.title}</h2></div>
            <div id="todoDescription"><span class="colorlightGrey">${task.description}</span></div>
            <div class="todoSubtasks" id="todoSubtasks${index}">
               <label><progress id="progressBar${index}" max="100" value="50">10%</progress></label>
               <span>${subTasksLength}/${tasks[index]['subtasks'].length} Subtasks</span>
            </div>
            <div class="assignedAndPrio">
                <div class="dflexCC">
                    <div id="todoAssignedTo${index}"></div>
                    <div class="toMuch" id="ifToMuch${index}"></div>
               </div>
               <div id="todoPriority"><img class="prioIconBoard" src="${getPrioIcon(task.priority)}" alt=""></div>
            </div>
        </div>`;
}

/**
* generate html
* @param {string} contact 
* @param {int} contactId 
* @returns 
*/
function printAssignedTo(contact, contactId) {
    return /*html*/ `<span id="${contactId}">${getInitials(contact)}</span>`;
}

/**
* generate html
* @param {string} user from renderUser() function
* @param {Int} index from renderUser() function
* @returns 
*/
function printUsers(user, index) {
    return /*html*/ `
        <div class="user" id="user${index}" >
            <span>${user}</span>
            <img onclick="selectUser(${index})" id="imgUncheck${index}" src="./assets/img/check_unchecked.png" alt="">
            <img onclick="unselectUser(${index})" id="imgCheck${index}" class="d-none" src="./assets/img/check_checked.png" alt="">
        </div>
    `;
}

/**
 * create html code
 * @param {string} subTask from the subTasks array
 * @returns 
 */
function printSubTasks(subTask, index) {
    return /*html*/ `
        <div class="subTaskBox hoverSubTask" id="subTaskBox${index}">
            <li class="hoverSubTask" id="subTask${index}">${subTask}</li>
            <div class="d-none subTaskInput" id="subTaskInput${index}">
                <div class="subTaskEditBox">
                    <input id="newSubTask${index}" type="text" placeholder="edit...">
                    <div class="deleteAndEditIcons" class="deleteAndEditIcons">
                        <img onclick="deleteSubTask(${index})" src="./assets/img/delete.png" alt="">
                        <img onclick="saveNewSubTask(${index})" src="./assets/img/check.png" alt="">
                    </div>
                </div>
                <hr id="dividerHorizontal${index}" class="dividerHorizontal d-none">
            </div>
            <div id="deleteAndEditIcons${index}" class="deleteAndEditIcons">
                <img onclick="showEditSubTaskInputField(${index})" src="./assets/img/edit.png" alt="">
                <hr class="dividerVertical">
                <img onclick="deleteSubTask(${index})" src="./assets/img/delete.png" alt="">
            </div>
        </div>`;
}

/**
 * generate html from the initials
 * @param {string} user 
 * @param {Int} index 
 * @returns 
 */
function printSelectedUsers(user, index) {
    return /*html*/ `
        <div id="selectedUser${index}" class="selectedUser">
            ${getInitials(user)}
        </div>`;
}