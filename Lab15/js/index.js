document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todoForm');
    const list = document.getElementById('todoList');
    const template = document.getElementById('task-template');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    let isEditing = false;
    let currentEditedElement = null;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            tag: formData.get('tag'),
            deadline: formData.get('deadline')
        };

        if (isEditing && currentEditedElement) {
            const titleElement = currentEditedElement.querySelector('.task-card__title');
            const descElement = currentEditedElement.querySelector('.task-card__desc');

            if (titleElement && taskData.title) {
                titleElement.textContent = taskData.title;
            }
    
            if (descElement && taskData.desc) {
                descElement.textContent = taskData.desc;
            }

            isEditing = false;
            currentEditedElement = null;

            resetFormState();
        } else {
            const newTask = { id: Date.now(), ...taskData, isDone: false };
            addTaskToDOM(newTask);
            form.reset();
        }
    });

    form.addEventListener('reset', () => resetFormState());

    function resetFormState() {
        isEditing = false;
        currentEditedElement = null;
        form.reset();
        submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-save"></use></svg> <span class="btn__text">Додати задачу</span>`;
        submitBtn.classList.remove('btn--edit');
        submitBtn.classList.add('btn--primary');
    }

    function addTaskToDOM(task) {
        const fragment = template.content.cloneNode(true);
        const el = fragment.querySelector('.task-card');
        el.dataset.id = task.id;
        
        el.querySelector('.task-card__title').textContent = task.title;
        el.querySelector('.task-card__tag').textContent = task.tag;
        el.querySelector('.task-card__desc').textContent = task.description;
        el.querySelector('.task-card__deadline').textContent = task.deadline || 'Без дати';
        list.prepend(el);
    }

    list.addEventListener('click', (event) => {
        const btn = event.target.closest('.btn');
        if (!btn) return;
        const card = btn.closest('.task-card');

        if (btn.classList.contains('btn--delete')) {
            if (confirm('Видалити задачу?')) {
                if (currentEditedElement === card) resetFormState();
                card.remove();
            }
        }
        if (btn.classList.contains('btn--complete')) {
            card.classList.toggle('task-card--done');
            const status = card.querySelector('.task-card__status');
            if (card.classList.contains('task-card--done')) {
                status.textContent = `✅ Виконано: ${new Date().toLocaleString()}`;
                btn.style.opacity = '0.5';
            } else {
                status.textContent = `Статус: В роботі`;
                btn.style.opacity = '1';
            }
        }
        if (btn.classList.contains('btn--edit-action')) {
            isEditing = true;
            currentEditedElement = card;
            
            const title = card.querySelector('.task-card__title').textContent;
            const desc = card.querySelector('.task-card__desc').textContent;
            const tag = card.querySelector('.task-card__tag').textContent;
            let deadline = card.querySelector('.task-card__deadline').textContent;
            if (deadline === 'Без дати') deadline = '';

            form.elements['title'].value = title;
            form.elements['description'].value = desc;
            form.elements['tag'].value = tag;
            form.elements['deadline'].value = deadline;

            submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-edit"></use></svg> <span class="btn__text">Зберегти зміни</span>`;
            submitBtn.classList.remove('btn--primary');
            submitBtn.classList.add('btn--edit');
            form.scrollIntoView({ behavior: 'smooth' });
        }
    });
});