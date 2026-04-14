const input = document.getElementById('task-input');
const button = document.getElementById('add-task-btn');
const list = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const clearAllBtn = document.getElementById('clear-all');

// 1. Inicjalizacja stanu
let tasks = JSON.parse(localStorage.getItem('zen_tasks')) || [];

// 2. Wyświetlanie daty
document.getElementById('date-display').textContent = new Date().toLocaleDateString('pl-PL', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});

// 3. Renderowanie listy
function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="task-content">
                <div class="custom-checkbox" onclick="toggleTask(${index})">
                    ${task.completed ? '✓' : ''}
                </div>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">USUŃ</button>
        `;
        list.appendChild(li);
    });
    
    updateStats();
    localStorage.setItem('zen_tasks', JSON.stringify(tasks));
}

// 4. Funkcje operacyjne
function addTask() {
    const text = input.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        input.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateStats() {
    const active = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${active} aktywnych zadań`;
}

// 5. Event Listeners
button.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
clearAllBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    renderTasks();
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Sprawdź, czy użytkownik miał już ustawiony tryb jasny w localStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Zmień ikonkę i zapisz preferencję
    if (body.classList.contains('light-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});
// Start aplikacji
renderTasks();