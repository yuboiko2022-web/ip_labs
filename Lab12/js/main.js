console.log("--- Лабораторна робота №12 ---");

console.log("\n--- ВАРІАНТ 1 ---");

function calculateSum(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
console.log("Завдання 1 (Sum 1-5):", calculateSum(5)); 

const multiply = function(a, b) {
    return a * b;
};
console.log("Завдання 2 (Multiply 5*4):", multiply(5, 4)); 

const power = (a, b) => Math.pow(a, b); 
console.log("Завдання 3 (Power 2^3):", power(2, 3)); 

function harmonicSeries(n) {
    if (n === 1) return 1; 
    return (1 / n) + harmonicSeries(n - 1); 
}
console.log("Завдання 4 (Harmonic 3):", harmonicSeries(3)); 

function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}
const double = createMultiplier(2);
console.log("Завдання 5 (Double 5):", double(5)); 

function processSet(set, callback) {
    for (const value of set) {
        callback(value);
    }
}
const mySet1 = new Set([10, 20, 30]);
console.log("Завдання 6 (Set output):");
processSet(mySet1, (val) => console.log(`Елемент: ${val}`));

console.log("\n--- ВАРІАНТ 2 ---");

function findMax(a, b) {
    return a > b ? a : b;
}
console.log("Завдання 1 (Max of 10, 25):", findMax(10, 25)); 

const subtract = function(a, b) {
    return a - b;
};
console.log("Завдання 2 (Subtract 10-4):", subtract(10, 4)); 

const sqrt = (n) => Math.sqrt(n);
console.log("Завдання 3 (Sqrt 16):", sqrt(16)); 

function geometricProgression(n, a, r) {
    if (n === 1) return a; 
    return (a * Math.pow(r, n - 1)) + geometricProgression(n - 1, a, r);
}
console.log("Завдання 4 (GeoProgression n=3, a=2, r=2):", geometricProgression(3, 2, 2)); 

function createDivider(divisor) {
    return function(number) {
        return number / divisor;
    };
}
const half = createDivider(2);
console.log("Завдання 5 (Half of 10):", half(10)); 

function processSetV2(set, callback) {
    set.forEach(value => callback(value));
}
const mySet2 = new Set(["Apple", "Banana", "Cherry"]);
console.log("Завдання 6 (Set output):");
processSetV2(mySet2, (val) => console.log(`Фрукт: ${val}`));