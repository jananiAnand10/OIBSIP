let all_task = [];
        let done_task = [];
        let left_task = [];

        function Adding_ToScreen() {
            let tasks = document.getElementById("task_list");
            let tasks_left = document.getElementById("task_left");
            const new_task = all_task[all_task.length - 1];//accessing the last element
            const listItem = document.createElement("li");//creating<li>tag for each element
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "taskCheckbox" + all_task.length;
            const label = document.createElement("label");
            label.textContent = new_task.task+" - "+new_task.dateTime.replace("T", " - ")+" ";
            label.setAttribute("for", checkbox.id);
            label.id = "label" + all_task.length;
            listItem.appendChild(checkbox);
            checkbox.addEventListener("input", function(){onchecked(checkbox, label, new_task);});

            const deleteBtn = document.createElement("button");
            deleteBtn.id="button1";
            const image1 = document.createElement("img");
            image1.src="close.jpg";
            image1.alt = "Close Icon";
            image1.style.width = "20px";
            deleteBtn.appendChild(image1);
            deleteBtn.addEventListener("click",function(){deleteTask(new_task);});
            
            const editBtn = document.createElement("button");
            editBtn.id="button2";
            const image2 = document.createElement("img");
            image2.src="edit1.png";
            image2.alt = "Edit Icon";
            image2.style.width = "20px";
            editBtn.appendChild(image2);
            editBtn.addEventListener("click",function(){editTask(new_task);});

            listItem.appendChild(label);
            listItem.appendChild(deleteBtn);
            listItem.appendChild(editBtn);
            tasks.appendChild(listItem);

            const Item_left = document.createElement("li");
            const txt = document.createTextNode(new_task.task+" - "+new_task.dateTime.replace("T", " - ")+" ");
            txt.id=Item_left+all_task.length;
            Item_left.appendChild(txt);
            tasks_left.appendChild(Item_left);
        }

        function addToList() {
            const task_input = document.getElementById("task");
            const taskDateTime_input = document.getElementById("taskDateTime");
            const new_task = task_input.value.trim();
            const taskDateTime = taskDateTime_input.value;
        if (new_task !== "" && taskDateTime_input.value!=="") 
        {
                all_task.push({
                    task: new_task,
                    dateTime: taskDateTime
                });
                task_input.value = ""; // Clear the input field
                taskDateTime_input.value = ""; // Clear the date and time input field
                Adding_ToScreen();
        }
        }

        function onchecked(checkbox, label, taskObj) {
    if (checkbox.checked) {
        // Apply strikethrough style to the label text
        label.style.textDecoration = "line-through";
        update_CheckedList(taskObj);
        remove_taskLeft(taskObj);
    } else {
        // Remove strikethrough style from the label text
        label.style.textDecoration = "none";
    }
}
    function update_CheckedList(taskObj) {
    let done_tasks = document.getElementById("task_done");
    const List_Item = document.createElement("li");
    const textNode = document.createTextNode(taskObj.task + " - " + taskObj.dateTime.replace("T", " - ")+" ");
    List_Item.appendChild(textNode);
    done_tasks.appendChild(List_Item);
}
function remove_taskLeft(taskObj) {
    let tasks_left = document.getElementById("task_left");
    let taskItems = tasks_left.getElementsByTagName("li");

    for (let i = 0; i < taskItems.length; i++) {
        const taskText = taskItems[i].textContent.trim();
        const taskObjText = taskObj.task + " - " + taskObj.dateTime.replace("T", " - ");
        if (taskText === taskObjText) 
        {
            tasks_left.removeChild(taskItems[i]);
            break;
        }
    }
}
function editTask(taskObj) {
    let index = all_task.indexOf(taskObj);
    const newTask = prompt("Edit task:", taskObj.task);
    if (newTask !== null) {
        const newDateTime = prompt("Edit date and time (YYYY-MM-DDTHH:mm):", taskObj.dateTime);
        if (newDateTime !== null) {
            taskObj.task = newTask;
            taskObj.dateTime = newDateTime;
            updateTaskInView(taskObj, index);
        }
    }
}
function deleteTask(taskObj) {
    let tasks = document.getElementById("task_list");
    let taskItems = tasks.getElementsByTagName("li");
    for (let i = 0; i < all_task.length; i++) {
        if (all_task[i] === taskObj) {
            tasks.removeChild(taskItems[i]);
            all_task.splice(i, 1);
            remove_taskLeft(taskObj); // Update to pass task name
            break;
        }
    }
}
function updateTaskInView(taskObj, index) {
    const tasks = document.getElementById("task_list");
    const tasks_left=document.getElementById("task_left")
    const listItem = tasks.children[index];
    const leftItem = tasks_left.children[index];
    if (listItem) {
        const label = listItem.getElementsByTagName("label")[0];
        const txt = document.createTextNode(taskObj.task + " - " + taskObj.dateTime.replace("T", " - ") + " ");
        label.innerHTML = "";  // Clear existing content
        label.appendChild(txt);
    }
    if (leftItem) {
        leftItem.innerHTML = "";  // Clear existing content
        const txt = document.createTextNode(taskObj.task + " - " + taskObj.dateTime.replace("T", " - ") + " ");
        leftItem.appendChild(txt);
    }
}