document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    const createConfirmationPrompt = (taskItem) => {
        const promptDiv = document.createElement('div');
        promptDiv.classList.add('confirmation-prompt');

        const message = document.createElement('p');
        message.innerText = "Are you sure you want to delete this task?";
        promptDiv.appendChild(message);

        const yesButton = document.createElement('button');
        yesButton.innerText = "✔";
        yesButton.classList.add('confirmation-btn');
        yesButton.style.color = 'green';
        yesButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            document.body.removeChild(promptDiv);
        });
        promptDiv.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.innerText = "✖";
        noButton.classList.add('confirmation-btn');
        noButton.style.color = 'red';
        noButton.addEventListener('click', () => {
            document.body.removeChild(promptDiv);
        });
        promptDiv.appendChild(noButton);

        // Append the promptDiv to the body directly
        document.body.appendChild(promptDiv);
    };

    addTaskBtn.addEventListener('click', () => {
        const taskValue = newTaskInput.value.trim();

        if (taskValue) {
            const taskItemContainer = document.createElement('div');
            taskItemContainer.classList.add('task-item-container');

            const taskItem = document.createElement('li');
            taskItem.innerText = taskValue;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = "x";
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                createConfirmationPrompt(taskItemContainer);
            });

            taskItemContainer.appendChild(taskItem);
            taskItemContainer.appendChild(deleteBtn);
            taskList.appendChild(taskItemContainer);

            newTaskInput.value = ''; 
        }
    });
});
