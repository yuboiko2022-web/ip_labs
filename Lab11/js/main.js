console.log("--- Завдання 1: Ромб ---");
let n = prompt("Варіант 1. Завдання 1 (Ромб). Введіть розмір n:", "3");
n = parseInt(n);

if (!isNaN(n) && n > 0) {
    for (let i = 1; i <= n; i++) {
        let str = "";
        for (let s = 0; s < n - i; s++) {
            str += "  "; 
        }
        for (let j = 1; j <= i; j++) {
            str += j + " ";
        }
        for (let j = i - 1; j >= 1; j--) {
            str += j + " ";
        }
        console.log(str);
    }
    for (let i = n - 1; i >= 1; i--) {
        let str = "";
        for (let s = 0; s < n - i; s++) {
            str += "  ";
        }
        for (let j = 1; j <= i; j++) {
            str += j + " ";
        }
        for (let j = i - 1; j >= 1; j--) {
            str += j + " ";
        }
        console.log(str);
    }
} else {
    console.log("Некоректне введення для ромба.");
}
console.log("--- Завдання 2: Сума ряду ---");
let n2 = prompt("Варіант 1. Завдання 2. Введіть n для ряду:", "5");
n2 = parseInt(n2);
let sum = 0;

if (!isNaN(n2) && n2 > 0) {
    let seriesStr = "S = ";
    for (let i = 1; i <= n2; i++) {
        sum += 1 / i;
        seriesStr += (i === 1 ? "1" : "1/" + i) + (i < n2 ? " + " : "");
    }
    console.log(seriesStr);
    console.log("Сума ряду: " + sum);
} else {
    console.log("Некоректне число для ряду.");
}
console.log("--- Завдання 3: Гра 'Вгадай число' ---");
const targetNumber = Math.floor(Math.random() * 20) + 1;
let guess;
let attempts = 0;
alert("Завдання 3. Я загадав число від 1 до 20. Спробуй вгадати!");

do {
    let input = prompt("Введіть ваше число (або 'cancel' для виходу):");
    if (input === null) break; 
    
    guess = parseInt(input);
    attempts++;

    if (isNaN(guess)) {
        alert("Будь ласка, введіть число.");
    } else if (guess < targetNumber) {
        alert("Загадане число БІЛЬШЕ.");
    } else if (guess > targetNumber) {
        alert("Загадане число МЕНШЕ.");
    } else {
        alert(`Вітаю! Ви вгадали число ${targetNumber} за ${attempts} спроб.`);
        console.log(`Гра завершена. Число ${targetNumber} вгадано.`);
    }
} while (guess !== targetNumber);

