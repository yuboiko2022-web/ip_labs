import { Todo } from "../models/Todo";
import { TodoRepository } from "./TodoRepository";

export class ApiTodoRepository implements TodoRepository {
  private apiUrl = "https://69b11abdadac80b427c3fff2.mockapi.io/api/v1/todoItem"; 

  async getAll(): Promise<Todo[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) throw new Error("Помилка завантаження"); 
    return await response.json();
  }

  async add(todo: Todo): Promise<Todo> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Помилка сервера");
    return await response.json();
  }

  // Виконане Завдання 2: Збереження відредагованих даних на сервері (PUT)
  async update(id: string, data: Partial<Todo>): Promise<Todo> { 
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Помилка оновлення на сервері");
    return await response.json();
  }

  // Виконане Завдання 1: Видалення запису із сервера (DELETE)
  async remove(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Помилка видалення на сервері");
  }
}