console.log("Варіант 1: Система управління курсами");

function Person(name) {
    this.name = name;
}

Person.prototype.introduce = function() {
    console.log(`Вітаю, мене звати ${this.name}.`);
};

function Course(title) {
    this.title = title;
    this.students = [];
}

Course.prototype.addStudent = function(student) {
    this.students.push(student);
    student.courses.push(this); 
    console.log(`Студента ${student.name} додано до курсу "${this.title}".`);
};

function Student(name) {
    Person.call(this, name); 
    this.courses = [];
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.viewCourses = function() {
    const courseNames = this.courses.map(c => c.title).join(", ");
    console.log(`${this.name} навчається на курсах: ${courseNames || "немає курсів"}`);
};

function Teacher(name) {
    Person.call(this, name);
    this.myCourses = [];
}

Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.createCourse = function(title) {
    const newCourse = new Course(title);
    this.myCourses.push(newCourse);
    console.log(`Викладач ${this.name} створив курс "${title}".`);
    return newCourse;
};

console.log("--- ДЕМОНСТРАЦІЯ ---");

const teacher1 = new Teacher("Олег Петрович");
const student1 = new Student("Марія");
const student2 = new Student("Іван");

teacher1.introduce();
student1.introduce();

const jsCourse = teacher1.createCourse("Програмування в Інтернет");
jsCourse.addStudent(student1);
jsCourse.addStudent(student2);

student1.viewCourses();
console.log("Список студентів на курсі JS:", jsCourse.students);