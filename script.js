// script.js

// 获取页面元素
const reminderForm = document.getElementById('reminderForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const reminderTimeInput = document.getElementById('reminderTime');
const reminderList = document.getElementById('reminderList');

// 提醒事项数组
let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

// 添加事项
reminderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const reminderTime = reminderTimeInput.value;

    if (title && content && reminderTime) {
        const reminder = {
            id: Date.now(),
            title,
            content,
            reminderTime,
            completed: false
        };

        reminders.push(reminder);
        localStorage.setItem('reminders', JSON.stringify(reminders));

        // 重置表单
        titleInput.value = '';
        contentInput.value = '';
        reminderTimeInput.value = '';

        renderReminders();
        checkReminders();
    }
});

// 渲染提醒事项
function renderReminders() {
    reminderList.innerHTML = '';
    reminders.forEach(reminder => {
        const li = document.createElement('li');
        li.className = reminder.completed ? 'completed' : '';
        li.innerHTML = `
            <strong>${reminder.title}</strong>
            <p>${reminder.content}</p>
            <p>提醒时间：${new Date(reminder.reminderTime).toLocaleString()}</p>
            <button onclick="toggleCompletion(${reminder.id})">标记为完成</button>
        `;
        reminderList.appendChild(li);
    });
}

// 标记事项为完成
function toggleCompletion(id) {
    const reminder = reminders.find(r => r.id === id);
    reminder.completed = !reminder.completed;
    localStorage.setItem('reminders', JSON.stringify(reminders));
    renderReminders();
}

// 检查并提醒事项
function checkReminders() {
    const now = new Date();

    reminders.forEach(reminder => {
        const reminderTime = new Date(reminder.reminderTime);
        if (reminderTime <= now && !reminder.completed) {
            alert(`提醒：${reminder.title}`);
        }
    });
}

// 每分钟检查一次提醒事项
setInterval(checkReminders, 60000);

// 初始化页面
renderReminders();
checkReminders();
