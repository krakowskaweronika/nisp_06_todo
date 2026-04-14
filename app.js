const input = document.getElementById('task-input');
const button = document.getElementById('add-task-btn');
const list = document.getElementById('task-list');

button.addEventListener('click', addTask);

function addTask() {
    const taskText = input.value.trim();

    if (taskText === '') return;

    const li = document.createElement('li');

    // Lewa część (checkbox + tekst)
    const left = document.createElement('div');
    left.classList.add('task-left');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = taskText;

    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
    });

    left.appendChild(checkbox);
    left.appendChild(span);

    // Przycisk usuwania
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Usuń';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(left);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value = '';
}