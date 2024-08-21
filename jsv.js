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

    function createTaskItem(taskText) {
        const listItem = document.createElement('li');
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText;
        editInput.className = 'edit-input';
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.addEventListener('click', () => {
            showDialog(listItem);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => {
            if (editInput.style.display === 'none') {
                editInput.style.display = 'block';
                taskTextSpan.style.display = 'none';
                editInput.focus();
            } else {
                const updatedText = editInput.value.trim();
                if (updatedText) {
                    taskTextSpan.textContent = updatedText;
                    editInput.style.display = 'none';
                    taskTextSpan.style.display = 'block';
                }
            }
        });

        listItem.appendChild(taskTextSpan);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);

        return listItem;
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const listItem = createTaskItem(taskText);
        taskList.appendChild(listItem);
        taskInput.value = '';
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });
});
