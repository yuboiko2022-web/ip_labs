export class Course {
    constructor(title) {
        this.title = title;
        this.students = [];
    }
    
    addStudent(student) {
        this.students.push(student);
        console.log(`Студента ${student.name} додано до курсу "${this.title}".`);
    }
}