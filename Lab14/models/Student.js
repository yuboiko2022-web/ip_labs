import { Person } from './Person.js';

export class Student extends Person {
    constructor(name) {
        super(name);
        this.courses = [];
    }
    
    viewCourses() {
        if (this.courses.length === 0) {
            console.log(`${this.name} ще не записаний на жоден курс.`);
            return;
        }
        console.log(`Курси студента ${this.name}:`);
        this.courses.forEach(course => console.log(`- ${course.title}`));
    }
}