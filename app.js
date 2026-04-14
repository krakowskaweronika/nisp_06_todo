const input = document.getElementById('task-input');
const button = document.getElementById('add-task-btn');
const list = document.getElementById('task-list');

button.addEventListener('click', () => {
    const taskText = input.value;

    if (taskText.trim() !== '') {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const span = document.createElement('span');
        span.textContent = taskText;

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
        });

        li.appendChild(checkbox);
        li.appendChild(span);

        list.appendChild(li);

        input.value = '';
    }
});