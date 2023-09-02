document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    const createTaskItem = (taskValue) => {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item-container');
        taskItemContainer.classList.add('task-added');  // Add this line for the animation when a task is added

        // Checkbox for completed task
    const taskCompleteCheckbox = document.createElement('input');
        taskCompleteCheckbox.type = 'checkbox';
        taskCompleteCheckbox.addEventListener('change', () => {
            taskItem.classList.toggle('completed-task', taskCompleteCheckbox.checked);
            
            if(taskCompleteCheckbox.checked) {
                taskItemContainer.classList.add('task-completed');
                
                setTimeout(() => {
                    taskItemContainer.classList.remove('task-completed');
                }, 3000); // 3 seconds to allow for the dissolve and blowAway animations to finish
            } else {
                taskItemContainer.classList.remove('task-completed');
            }
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

         // Remove the .task-added class after the animation completes
         setTimeout(() => {
            taskItemContainer.classList.remove('task-added');
        }, 600);  // 0.6s is the duration of the pulsate animation
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

    // Function that contains the steps to add a task
    function addTask() {
        const taskValue = newTaskInput.value.trim();
        if (taskValue) {
            createTaskItem(taskValue);
            newTaskInput.value = ''; // Clear the input after adding
        }
    }

    // When the button is clicked, just call the function
    addTaskBtn.addEventListener('click', addTask);

    // When the "Enter" key is pressed in the input field, also call the function
    newTaskInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            addTask();
        }
    });
});
