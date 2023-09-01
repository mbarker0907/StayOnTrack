document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', () => {
        const taskValue = newTaskInput.value.trim();
        
        if(taskValue) {
            const taskItem = document.createElement('li');
            taskItem.innerText = taskValue;
            taskList.appendChild(taskItem);
            newTaskInput.value = ''; // Clear the input
        }
    });
});
