document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    // Function to create individual task items
    const createTaskItem = (taskValue) => {
        // Task container
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item-container', 'task-added');

        // Checkbox for marking a task as completed
        const taskCompleteCheckbox = document.createElement('input');
        taskCompleteCheckbox.type = 'checkbox';
        taskCompleteCheckbox.addEventListener('change', handleTaskCompletion);
        taskItemContainer.appendChild(taskCompleteCheckbox);

        // Task item
        const taskItem = document.createElement('li');
        taskItem.innerText = taskValue;
        taskItemContainer.appendChild(taskItem);

        // Delete task button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "x";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => createConfirmationPrompt(taskItemContainer));
        taskItemContainer.appendChild(deleteBtn);

        // Append the complete task item to the task list
        taskList.appendChild(taskItemContainer);

        // Animation handling for newly added task
        setTimeout(() => taskItemContainer.classList.remove('task-added'), 600);
    };

    // Function to handle task completion animation and logic
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

    // Confirmation prompt for task deletion
    const createConfirmationPrompt = (taskItemContainer) => {
        const promptDiv = document.createElement('div');
        promptDiv.classList.add('confirmation-prompt');

        const message = document.createElement('p');
        message.innerText = "Are you sure you want to delete this task?";
        promptDiv.appendChild(message);

        // Yes button
        const yesButton = createPromptButton('✔', 'green', () => {
            taskItemContainer.style.animation = "slideFadeOut 0.5s forwards";
            setTimeout(() => taskList.removeChild(taskItemContainer), 500); 
            document.body.removeChild(promptDiv);
        });
        promptDiv.appendChild(yesButton);

        // No button
        const noButton = createPromptButton('✖', 'red', () => document.body.removeChild(promptDiv));
        promptDiv.appendChild(noButton);

        document.body.appendChild(promptDiv);
    };

    // Utility function to create prompt buttons (Yes/No)
    function createPromptButton(text, color, onClick) {
        const button = document.createElement('button');
        button.innerText = text;
        button.classList.add('confirmation-btn');
        button.style.color = color;
        button.addEventListener('click', onClick);
        return button;
    }

    // Function to add a task
    function addTask() {
        const taskValue = newTaskInput.value.trim();
        if (taskValue) {
            createTaskItem(taskValue);
            newTaskInput.value = ''; // Clear the input
        }
    }

    // Event listeners for adding tasks
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            addTask();
        }
    });
});
