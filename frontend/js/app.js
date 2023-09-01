document.addEventListener('DOMContentLoaded', () => {

    // Getting references to the elements
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    // Adding a click event listener to the add task button
    addTaskBtn.addEventListener('click', () => {
        
        // Getting and trimming the task input value
        const taskValue = newTaskInput.value.trim();
        
        // Checking if the task input value is not empty
        if(taskValue) {
            
            // Creating a new list item element for the task
            const taskItem = document.createElement('li');
            
            // Creating a checkbox input element
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            
            // Adding an event listener to the checkbox to handle task completion
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    taskItem.classList.add('completed-task');
                } else {
                    taskItem.classList.remove('completed-task');
                }
            });

            // Appending the checkbox to the task item
            taskItem.appendChild(checkbox);
            
            // Creating a span to hold the task text
            const taskText = document.createElement('span');
            taskText.innerText = ` ${taskValue}`;

            // Appending the task text to the task item
            taskItem.appendChild(taskText);
            
            // Appending the task item to the task list
            taskList.appendChild(taskItem);
            
            // Clearing the input field for the next task
            newTaskInput.value = ''; 
        }
    });
});
