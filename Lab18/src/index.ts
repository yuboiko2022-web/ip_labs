import './scss/style.scss';
import { Todo } from "./models/Todo";
import { TodoRepository } from "./repositories/TodoRepository"; 
import { ApiTodoRepository } from "./repositories/ApiTodoRepository";

// Впишіть сюди свій номер за журналом (наприклад, 15)
const USER_ID = 15; 

document.addEventListener("DOMContentLoaded", () => {
  const repository: TodoRepository = new ApiTodoRepository();
  const mainHeader = document.getElementById("mainHeader") as HTMLHeadingElement | null;
  
  if (mainHeader) mainHeader.textContent += ` - Студент #${USER_ID}`;
  
  const form = document.getElementById("todoForm") as HTMLFormElement; 
  const list = document.getElementById("todoList") as HTMLElement; 
  const template = document.getElementById("task-template") as HTMLTemplateElement;
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  const loadingIndicator = document.getElementById("loadingIndicator") as HTMLElement;
  
  let isEditing = false;
  let currentEditId: string | null = null;
  
  async function fetchTodos() {
    loadingIndicator.style.display = "block";
    try {
      const data = await repository.getAll();
      list.innerHTML = "";
      data.forEach((task) => addTaskToDOM(task, true));
    } catch (error) {
      console.error(error);
      alert("Не вдалося завантажити завдання.");
    } finally {
      loadingIndicator.style.display = "none";
    }
  }

  function formatDate(timestamp: number | string | undefined): string { 
    if (!timestamp) return "Невідомо";
    const date = new Date(Number(timestamp) * 1000);
    return isNaN(date.getTime()) ? String(timestamp) : date.toLocaleDateString("uk-UA");
  }

  function addTaskToDOM(task: Todo, append = false) {
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const el = fragment.querySelector(".task-card") as HTMLElement; 
    el.dataset.id = task.id;
    
    if (task.isDone) el.classList.add("task-card--done");
    
    (el.querySelector(".task-card__id") as HTMLElement).textContent = String(task.id);
    (el.querySelector(".task-card__userid") as HTMLElement).textContent = String(task.userId);
    (el.querySelector(".task-card__title") as HTMLElement).textContent = task.title;
    (el.querySelector(".task-card__tag") as HTMLElement).textContent = task.tag;
    (el.querySelector(".task-card__desc") as HTMLElement).textContent = task.description;
    (el.querySelector(".task-card__deadline") as HTMLElement).textContent = task.deadline || "Без дати";
    (el.querySelector(".task-card__created") as HTMLElement).textContent = formatDate(task.createdAt);
    
    if (task.isDone) {
      (el.querySelector(".task-card__status") as HTMLElement).textContent = ` ✓ Виконано `;
      (el.querySelector(".btn--complete") as HTMLElement).style.opacity = "0.5";
    }
    
    append ? list.appendChild(el) : list.prepend(el);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const taskData: Todo = {
      userId: USER_ID,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tag: formData.get("tag") as string,
      deadline: formData.get("deadline") as string,
      createdAt: isEditing ? undefined : Math.floor(Date.now() / 1000), 
      isDone: false,
    };
    
    submitBtn.disabled = true;
    
    if (isEditing && currentEditId) {
      try {
        await repository.update(currentEditId, taskData);
        await fetchTodos();
        resetFormState();
      } catch (error) {
        console.error(error);
        alert("Помилка збереження змін.");
      }
    } else {
      try {
        const createdTask = await repository.add(taskData);
        addTaskToDOM(createdTask);
        form.reset();
      } catch (error) {
        console.error(error);
        alert("Помилка створення завдання.");
      }
    }
    submitBtn.disabled = false;
  });

  form.addEventListener("reset", () => resetFormState());
  
  function resetFormState() {
    isEditing = false;
    currentEditId = null;
    form.reset();
    submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-save"></use></svg> <span class="btn__text"> Додати задачу </span>`;
    submitBtn.classList.remove("btn--edit");
    submitBtn.classList.add("btn--primary");
  }

  list.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    const btn = target.closest(".btn") as HTMLButtonElement | null; 
    if (!btn) return;
    
    const card = btn.closest(".task-card") as HTMLElement;
    const taskId = card.dataset.id;
    if (!taskId) return;
    
    if (btn.classList.contains("btn--delete")) {
      if (confirm("Видалити цю задачу з сервера?")) {
        btn.disabled = true;
        try {
          await repository.remove(taskId);
          card.remove();
          if (currentEditId === taskId) resetFormState();
        } catch (error) {
          console.error(error);
          alert("Помилка видалення.");
          btn.disabled = false;
        }
      }
    }
    
    if (btn.classList.contains("btn--complete")) {
      const isCurrentlyDone = card.classList.contains("task-card--done"); 
      try {
        await repository.update(taskId, { isDone: !isCurrentlyDone });
        card.classList.toggle("task-card--done");
        const status = card.querySelector(".task-card__status") as HTMLElement; 
        
        if (!isCurrentlyDone) {
          status.textContent = ` ✔ Виконано `;
          btn.style.opacity = "0.5";
        } else {
          status.textContent = ` Статус: В роботі `;
          btn.style.opacity = "1";
        }
      } catch (error) {
        console.error(error);
        alert("Помилка зміни статусу.");
      }
    }
    
    if (btn.classList.contains("btn--edit-action")) {
      isEditing = true;
      currentEditId = taskId;
      (form.elements.namedItem("title") as HTMLInputElement).value = (card.querySelector(".task-card__title") as HTMLElement).textContent || "";
      (form.elements.namedItem("description") as HTMLInputElement).value = (card.querySelector(".task-card__desc") as HTMLElement).textContent || "";
      (form.elements.namedItem("tag") as HTMLInputElement).value = (card.querySelector(".task-card__tag") as HTMLElement).textContent || "";
      let deadline = (card.querySelector(".task-card__deadline") as HTMLElement).textContent;
      (form.elements.namedItem("deadline") as HTMLInputElement).value = deadline === "Без дати" ? "" : (deadline || "");
      
      submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-edit"></use></svg> <span class="btn__text"> Зберегти зміни </span>`;
      submitBtn.classList.remove("btn--primary");
      submitBtn.classList.add("btn--edit");
      form.scrollIntoView({ behavior: "smooth" });
    }
  });

  fetchTodos();
});