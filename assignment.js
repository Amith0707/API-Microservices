// Question 1
let name = "Amith";
let age = 20;

console.log(`Hello ${name}, you are ${age} years old.`);


// Question 2
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

console.log("Addition:", add(10, 5));
console.log("Subtraction:", subtract(10, 5));
console.log("Multiplication:", multiply(10, 5));
console.log("Division:", divide(10, 5));


// Question 3
function checkEvenOdd(num) {
    if (num % 2 === 0) {
        console.log(`${num} is Even`);
    } else {
        console.log(`${num} is Odd`);
    }
}

checkEvenOdd(4);
checkEvenOdd(7);
checkEvenOdd(10);


// Question 4

// 1 to 20
for (let i = 1; i <= 20; i++) {
    console.log(i);
}

// Even numbers
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log("Even:", i);
    }
}

// Multiplication table of 5
for (let i = 1; i <= 10; i++) {
    console.log(`5 x ${i} = ${5 * i}`);
}



// Question 5
let students = ["Rahul", "Sneha", "Arjun", "Meera", "Kiran"];

// Add
students.push("Riya");

// Remove
students.splice(2, 1);

// Display
for (let i = 0; i < students.length; i++) {
    console.log(students[i]);
}

// Question 6
let user = {
    name: "Amith",
    email: "amith@gmail.com",
    password: "12345",
    age: 20
};

// Display name
console.log(user.name);

// Update email
user.email = "amithv@gmail.com";

// Add isAdmin
user.isAdmin = true;

console.log(user);


// Question 7
let todoList = [];

function addTask(task) {
    todoList.push(task);
}

function viewTasks() {
    console.log("Tasks:", todoList);
}

function updateTask(index, newTask) {
    todoList[index] = newTask;
}

function deleteTask(index) {
    todoList.splice(index, 1);
}

// Testing
addTask("Learn JavaScript");
addTask("Build API");
viewTasks();

updateTask(0, "Master JavaScript");
viewTasks();

deleteTask(1);
viewTasks();

// Question 8
let userObj = {
    name: "Amith",
    age: 20
};

// Convert to JSON
let jsonString = JSON.stringify(userObj);
console.log(jsonString);

// Convert back
let parsedObj = JSON.parse(jsonString);
console.log(parsedObj.name);

// Question 9
console.log("Start");

setTimeout(() => {
    console.log("Data Loaded");
}, 2000);

console.log("End");


// Question 10
function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Amith", age: 20 });
        }, 2000);
    });
}

async function getUser() {
    let user = await fetchUser();
    console.log(user);
}

getUser();