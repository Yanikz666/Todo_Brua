
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const confirmationDialog = document.getElementById('confirmation-dialog');
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');
    let taskToRemove = null;

    
    function showDialog(taskItem) {
        confirmationDialog.style.display = 'flex';
        taskToRemove = taskItem;
    }

        
    function hideDialog() {
        confirmationDialog.style.display = 'none';
    }

  
    confirmYesButton.addEventListener('click', () => {
        if (taskToRemove) {
            taskList.removeChild(taskToRemove);
        }
        hideDialog();
    });

    
    confirmNoButton.addEventListener('click', hideDialog);

   
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

     
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

      
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.addEventListener('click', () => {
            showDialog(listItem);
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

      
        taskInput.value = '';
    });


    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });
});
