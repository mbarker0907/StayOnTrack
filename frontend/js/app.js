document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    const createTaskItem = (taskValue) => {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item-container');

        // Checkbox for completed task
        const taskCompleteCheckbox = document.createElement('input');
        taskCompleteCheckbox.type = 'checkbox';
        taskCompleteCheckbox.addEventListener('change', () => {
            taskItem.classList.toggle('completed-task', taskCompleteCheckbox.checked);
        });
        taskItemContainer.appendChild(taskCompleteCheckbox);

        // The task itself
        const taskItem = document.createElement('li');
        taskItem.innerText = taskValue;
        taskItemContainer.appendChild(taskItem);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "x";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            createConfirmationPrompt(taskItemContainer);
        });
        taskItemContainer.appendChild(deleteBtn);

        // Append to task list
        taskList.appendChild(taskItemContainer);
    };

    const createConfirmationPrompt = (taskItemContainer) => {
        const promptDiv = document.createElement('div');
        promptDiv.classList.add('confirmation-prompt');

        const message = document.createElement('p');
        message.innerText = "Are you sure you want to delete this task?";
        promptDiv.appendChild(message);

        // Yes button
        const yesButton = document.createElement('button');
        yesButton.innerText = "✔";
        yesButton.classList.add('confirmation-btn');
        yesButton.style.color = 'green';
        yesButton.addEventListener('click', () => {
            taskItemContainer.style.animation = "slideFadeOut 0.5s forwards";
            setTimeout(() => {
                taskList.removeChild(taskItemContainer);
            }, 500); 
            document.body.removeChild(promptDiv);
        });
        promptDiv.appendChild(yesButton);

        // No button
        const noButton = document.createElement('button');
        noButton.innerText = "✖";
        noButton.classList.add('confirmation-btn');
        noButton.style.color = 'red';
        noButton.addEventListener('click', () => {
            document.body.removeChild(promptDiv);
        });
        promptDiv.appendChild(noButton);

        // Append the prompt to the body
        document.body.appendChild(promptDiv);
    };

    addTaskBtn.addEventListener('click', () => {
        const taskValue = newTaskInput.value.trim();
        if (taskValue) {
            createTaskItem(taskValue);
            newTaskInput.value = ''; 
        }
    });
});
