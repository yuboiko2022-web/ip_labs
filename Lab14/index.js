import { Course } from './models/Course.js';
import { Teacher } from './models/Teacher.js';
import { Student } from './models/Student.js';

// Створюємо об'єкти
const course1 = new Course("WEB-програмування");
const course2 = new Course("Бази даних");

const teacher1 = new Teacher("Олександр Іванович");
const student1 = new Student("Іван Петренко");
const student2 = new Student("Марія Коваленко");

// Демонстрація методів
console.log("--- Викладачі та курси ---");
teacher1.addCourse(course1);
teacher1.addCourse(course2);

console.log("\n--- Додавання студентів ---");
course1.addStudent(student1);
course1.addStudent(student2);
course2.addStudent(student1);

// Додаємо курси студентам для коректного відображення
student1.courses.push(course1, course2);
student2.courses.push(course1);

console.log("\n--- Перегляд курсів студентами ---");
student1.viewCourses();
student2.viewCourses();