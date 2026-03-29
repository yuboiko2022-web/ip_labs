import { Person } from './Person.js';

export class Teacher extends Person {
    constructor(name) {
        super(name);
        this.courses = [];
    }
    
    addCourse(course) {
        this.courses.push(course);
        console.log(`Викладач ${this.name} тепер веде курс "${course.title}".`);
    }
}