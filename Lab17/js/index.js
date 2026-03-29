const API_URL = "https://69b11abdadac80b427c3fff2.mockapi.io/api/v1/todoItem";

// Впищіть номер за журналом
const USER_ID = 1000;

document.addEventListener("DOMContentLoaded", () => {
  const mainHeader = document.getElementById("mainHeader");
  if (mainHeader) mainHeader.textContent += ` - Студент #${USER_ID}`;

  const form = document.getElementById("todoForm");
  const list = document.getElementById("todoList");
  const template = document.getElementById("task-template");
  const submitBtn = form.querySelector('button[type="submit"]');
  const loadingIndicator = document.getElementById("loadingIndicator");

  let isEditing = false;
  let currentEditId = null;

  async function fetchTodos() {
    loadingIndicator.style.display = "block";
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Помилка завантаження");
      const data = await response.json();

      list.innerHTML = "";
      data.forEach((task) => addTaskToDOM(task, true));
    } catch (error) {
      console.error(error);
      alert("Не вдалося завантажити завдання з сервера.");
    } finally {
      loadingIndicator.style.display = "none";
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return "Невідомо";
    const date = new Date(Number(timestamp) * 1000);
    return isNaN(date.getTime()) ? timestamp : date.toLocaleDateString("uk-UA");
  }

  function addTaskToDOM(task, append = false) {
    const fragment = template.content.cloneNode(true);
    const el = fragment.querySelector(".task-card");

    el.dataset.id = task.id;

    if (task.isDone) el.classList.add("task-card--done");

    el.querySelector(".task-card__id").textContent = task.id;
    el.querySelector(".task-card__userid").textContent = task.userId;
    el.querySelector(".task-card__title").textContent = task.title;
    el.querySelector(".task-card__tag").textContent = task.tag;
    el.querySelector(".task-card__desc").textContent = task.description;
    el.querySelector(".task-card__deadline").textContent =
      task.deadline || "Без дати";
    el.querySelector(".task-card__created").textContent = formatDate(
      task.createdAt,
    );

    if (task.isDone) {
      el.querySelector(".task-card__status").textContent = `✅ Виконано`;
      el.querySelector(".btn--complete").style.opacity = "0.5";
    }

    if (append) list.appendChild(el);
    else list.prepend(el);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const taskData = {
      userId: USER_ID,
      title: formData.get("title"),
      description: formData.get("description"),
      tag: formData.get("tag"),
      deadline: formData.get("deadline"),
      createdAt: isEditing ? undefined : Math.floor(Date.now() / 1000),
      isDone: false,
    };

    async function updateTask(currentEditId, taskData) {
      try {
        // Виконуємо fetch запит з методом "PUT" на адресу конкретного запису [cite: 183, 184]
        const response = await fetch(`${API_URL}/${currentEditId}`, {
         method: "PUT",
         headers: {
           // Вказуємо правильні headers 
        "Content-Type": "application/json"
          },
          // Передаємо taskData у body, перетворивши в рядок JSON 
         body: JSON.stringify(taskData)
       });

       if (response.ok) {
          // Після успішного запиту оновлюємо список та скидаємо стан форми [cite: 186]
         await fetchTodos();
         resetFormState();
        } else {
         console.error("Помилка при оновленні запису.");
        }
      } catch (error) {
        // Додаємо обробку помилок [cite: 187]
        console.error("Помилка:", error);
     }
    }

    submitBtn.disabled = true;

    if (isEditing && currentEditId) {
      alert("Завдання 2 - збереження змін (PUT)"); //// закоментуйте alert після виконання завдання
      // !!!!!!!!!!!!!! Ващ код !!!!!!!!!!!!!!!!
    } else {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });

        if (!response.ok) throw new Error("Помилка сервера");

        const createdTask = await response.json();
        addTaskToDOM(createdTask);
        form.reset();
      } catch (error) {
        console.error("Помилка створення:", error);
        alert("Не вдалося створити запис.");
      }
    }
    submitBtn.disabled = false;
  });

  form.addEventListener("reset", () => resetFormState());

  function resetFormState() {
    isEditing = false;
    currentEditId = null;
    form.reset();
    submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-save"></use></svg> <span class="btn__text">Додати задачу</span>`;
    submitBtn.classList.remove("btn--edit");
    submitBtn.classList.add("btn--primary");
  }

  list.addEventListener("click", async (event) => {
    const btn = event.target.closest(".btn");
    if (!btn) return;

    const card = btn.closest(".task-card");
    const taskId = card.dataset.id;

    if (btn.classList.contains("btn--delete")) {
      if (confirm("Видалити цю задачу з сервера?")) {
        alert("Завдання 1 - Функція видалення (DELETE)"); // закоментуйте alert після виконання завдання
        async function deleteTask(taskId, card) {
          try {
            // Робимо fetch запит з методом "DELETE" на адресу API з ID завдання [cite: 179]
              const response = await fetch(`${API_URL}/${taskId}`, {
              method: "DELETE"
            });

            // Якщо запит успішний, видаляємо картку з екрану [cite: 180]
            if (response.ok) {
              card.remove(); 
            } else {
              console.error("Помилка при видаленні запису з сервера.");
            }
          } catch (error) {
          // Додаємо обробку помилок [cite: 181]
          console.error("Помилка:", error);
        }     
      }
      }
    }

    // complete
    if (btn.classList.contains("btn--complete")) {
      const isCurrentlyDone = card.classList.contains("task-card--done");

      try {
        await fetch(`${API_URL}/${taskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDone: !isCurrentlyDone }),
        });

        card.classList.toggle("task-card--done");
        const status = card.querySelector(".task-card__status");
        if (!isCurrentlyDone) {
          status.textContent = `✅ Виконано`;
          btn.style.opacity = "0.5";
        } else {
          status.textContent = `Статус: В роботі`;
          btn.style.opacity = "1";
        }
      } catch (error) {
        console.error("Помилка зміни статусу:", error);
      }
    }

    // edit
    if (btn.classList.contains("btn--edit-action")) {
      isEditing = true;
      currentEditId = taskId;

      form.elements["title"].value =
        card.querySelector(".task-card__title").textContent;
      form.elements["description"].value =
        card.querySelector(".task-card__desc").textContent;
      form.elements["tag"].value =
        card.querySelector(".task-card__tag").textContent;

      let deadline = card.querySelector(".task-card__deadline").textContent;
      form.elements["deadline"].value = deadline === "Без дати" ? "" : deadline;

      submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-edit"></use></svg> <span class="btn__text">Зберегти зміни</span>`;
      submitBtn.classList.remove("btn--primary");
      submitBtn.classList.add("btn--edit");
      form.scrollIntoView({ behavior: "smooth" });
    }
  });

  fetchTodos();
});
