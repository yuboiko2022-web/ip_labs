// Використання коментарів у JavaScript

// --- Завдання 1: Hoisting (Підняття) ---
// 
console.log("Завдання 1:");

console.log(a); // Результат: undefined. Пояснення: var піднімається, але не ініціалізується[cite: 30, 34].
var a = 10;

try {
    console.log(b); 
} catch (e) {
    console.log("b: ReferenceError"); // Результат: ReferenceError. Пояснення: let не допускає звернення до ініціалізації[cite: 32, 34].
}
let b = 20;

try {
    console.log(c);
} catch (e) {
    console.log("c: ReferenceError"); // Результат: ReferenceError. Пояснення: const також знаходиться у "мертвій зоні" до ініціалізації.
}
const c = 30;


// --- Завдання 2: Область видимості (Scope) ---
// 
console.log("\nЗавдання 2:");

function testScope() {
    if (true) {
        var x = 5;    // Функціональна область видимості 
        let y = 10;   // Блокова область видимості 
        const z = 15; // Блокова область видимості 
    }
    console.log(x); // Результат: 5. Пояснення: var ігнорує блок {} і доступний у всій функції[cite: 42, 46].
    
    try { console.log(y); } catch(e) { console.log("y: ReferenceError"); } // Результат: ReferenceError[cite: 47].
    try { console.log(z); } catch(e) { console.log("z: ReferenceError"); } // Результат: ReferenceError[cite: 48].
}
testScope();


// --- Завдання 3: Приведення типів ---
// 
console.log("\nЗавдання 3:");

console.log(5 + "5");      // Результат: "55". Пояснення: число перетворюється на рядок (конкатенація)[cite: 64].
console.log("5" - 2);      // Результат: 3. Пояснення: рядок перетворюється на число для віднімання[cite: 65].
console.log(true + false); // Результат: 1. Пояснення: true стає 1, false стає 0.
console.log(null + 1);     // Результат: 1. Пояснення: null приводиться до 0[cite: 53].
console.log(undefined + 1);// Результат: NaN. Пояснення: undefined не можна перетворити на число.
console.log(0 == false);   // Результат: true. Пояснення: нестроге порівняння з приведенням типів.
console.log(0 === false);  // Результат: false. Пояснення: строге порівняння типів (number vs boolean).


// --- Завдання 4: Зміна об'єктів та Object.freeze() ---
// 
console.log("\nЗавдання 4:");

const person = {
    name: "John",
    age: 30
};

person.age = 31; // Працює: можна змінювати властивості об'єкта, навіть якщо він const[cite: 23].
person.city = "New York"; // Працює: додавання нової властивості.
console.log("До заморозки:", person);

Object.freeze(person); // Робимо об'єкт незмінним.
person.age = 40; // Не спрацює (в строгому режимі видасть помилку).
console.log("Після freeze (age не змінився):", person.age);

try {
    person = { name: "Alice", age: 25 }; // Помилка! Не можна переприсвоїти змінну const[cite: 23].
} catch (e) {
    console.log("Переприсвоєння person: Помилка (TypeError)");
}


// --- Завдання 5: Функція checkType ---
// 
console.log("\nЗавдання 5:");

function checkType(value) {
    return typeof value; // Використовуємо оператор typeof[cite: 55].
}

console.log(checkType(10));      // "number" [cite: 122]
console.log(checkType("Hello"));   // "string" [cite: 123]
console.log(checkType(null));    // "object" (відома особливість JS) [cite: 124, 58]