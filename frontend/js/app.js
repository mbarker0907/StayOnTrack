document.addEventListener('DOMContentLoaded', () => {

    // ======================== DOM Elements ======================== 
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    // ======================= API Functions ========================
    function fetchTasks() {
        fetch('http://127.0.0.1:5000/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => createTaskItem(task.id, task.description));
        });
    }

    function deleteTask(taskId) {
        fetch(`http://127.0.0.1:5000/delete-task/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Task deleted successfully!") {
                // Task is already removed from the frontend upon confirmation
            }
        });
    }

    // ======================== UI Functions ======================== 
    const createTaskItem = (taskId, taskDescription) => {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item-container', 'task-added');

        const taskCompleteCheckbox = document.createElement('input');
        taskCompleteCheckbox.type = 'checkbox';
        taskCompleteCheckbox.addEventListener('change', handleTaskCompletion);
        taskItemContainer.appendChild(taskCompleteCheckbox);

        const taskItem = document.createElement('li');
        taskItem.innerText = taskDescription;
        taskItemContainer.appendChild(taskItem);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "x";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => createConfirmationPrompt(taskItemContainer, taskId));
        taskItemContainer.appendChild(deleteBtn);

        taskList.appendChild(taskItemContainer);
        setTimeout(() => taskItemContainer.classList.remove('task-added'), 600);
    };

    function handleTaskCompletion() {
        const taskItem = this.nextElementSibling;
        taskItem.classList.toggle('completed-task', this.checked);

        if (this.checked) {
            this.parentElement.classList.add('task-completed');
            setTimeout(() => this.parentElement.classList.remove('task-completed'), 3000);
        } else {
            this.parentElement.classList.remove('task-completed');
        }
    }

    const createConfirmationPrompt = (taskItemContainer, taskId) => {
        const promptDiv = document.createElement('div');
        promptDiv.classList.add('confirmation-prompt');

        const message = document.createElement('p');
        message.innerText = "Are you sure you want to delete this task?";
        promptDiv.appendChild(message);

        const yesButton = createPromptButton('✔', 'green', () => {
            taskItemContainer.style.animation = "slideFadeOut 0.5s forwards";
            setTimeout(() => taskList.removeChild(taskItemContainer), 500);
            deleteTask(taskId);
            document.body.removeChild(promptDiv);
        });
        promptDiv.appendChild(yesButton);

        const noButton = createPromptButton('✖', 'red', () => document.body.removeChild(promptDiv));
        promptDiv.appendChild(noButton);

        document.body.appendChild(promptDiv);
    };

    function createPromptButton(text, color, onClick) {
        const button = document.createElement('button');
        button.innerText = text;
        button.classList.add('confirmation-btn');
        button.style.color = color;
        button.addEventListener('click', onClick);
        return button;
    }

    function addTask() {
        const taskValue = newTaskInput.value.trim();
        if (taskValue) {
            fetch('http://127.0.0.1:5000/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: taskValue })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Task added successfully!") {
                    createTaskItem(data.id, data.description); // Use returned ID from the response
                    newTaskInput.value = '';  // Clear the input
                }
            });
        }
    }
    
    // ======================= Event Listeners ====================== 
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            addTask();
        }
    });

    fetchTasks();
});
