//////// FUNCTIONS

let num = 100; // integer

// integer

/*
this is a 
block comment
*/

/*
function foo() {
    console.log(num);
    let num1 = 200;
};

 foo(); */

// console.log(num1); // gives error--only see num1 inside foo function

// anonymous functions: load to run
let anonFun = function() {
    console.log('hello');
};

// immediate load

(function() {
    console.log('Hello anon function');
})();


// => arrow function--newer way to declare functions
(() => console.log(100))();

let foo = () => console.log(num);

let num1 = 200;
foo = () => console.log(num1);
foo();
let bar = 100;
bar = 200;

//////// ARRAYS
let arr = ['foo', 123, ['zar', 'car']];
console.log(arr[1]);

// set item in arrya
arr[1] = 'barbar';
console.log(arr);

// .push = add item to end of array
arr.push('par');
console.log(arr);

// splice -- remove item from arrays (idx, delete)
arr.splice(2, 1);
console.log(arr);

let newArr = ['cow', 'turtle', 'goat'];

// loops
for (let item of newArr) {
    console.log(item);
};

for (let i in newArr) {
    console.log(i + ' ' + newArr[i]);
};

newArr.forEach((item, i) => console.log(i + ' ' + newArr[i]));

//////// OBJECTS

// key-name pairs like python dict
let obj1 = {
    name: "Jill",
    age: 85,
    job: 'Cactus Hunter',
};

// access property: 2 ways
console.log(obj1.name);
console.log(obj1['name']);

// set value
obj1.job = 'Barista';
console.log(obj1.job);

// loop thru all properties
for (let key in obj1) {
    let value = obj1[key];
    console.log(`This pair is ${key}: ${value}`);
}

// strings
// let str = "hello " + var1 + ' some more text here ' + var2;
// let str = `hello ${var1} some more text here ${var2}`;

// regular for loop
for (let i = 0; i < 10; i++) {
    console.log(i);
};

////// IF ELSE
let val = 80;
if (val > 80) {
    console.log('good')
} else if (val > 50) {
    console.log('okay')
} else {
    console.log('terrible')
};

// ternary statement q = if & : = else (only for 2 options)
let  y = (val >= 80) ? console.log('good') : console.log('not good');

// traversing the DOM
let newVar = document.getElementById('example');

// append
newVar.innerHTML += "Hello world!"