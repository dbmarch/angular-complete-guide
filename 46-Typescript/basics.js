// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Primitives
var age;
age = 12;
var userName;
userName = 'Dave';
var isInstructor;
isInstructor = false;
// More complex types
var hobbies;
hobbies = ['Sports', 'Cooking'];
var person;
// Create type and variable same time
person = {
    name: 'Dave',
    age: 55
};
// or use the type:
var person2 = {
    name: 'Mary',
    age: 30
};
var people;
var course = 'React -= The Complete Guide';
// course = 13;   can't do this because course is a string type
var course2 = 'React -= The Complete Guide';
course2 = 13;
// function takes 2 numbers and returns a number
function add(a, b) {
    return a + b;
}
function myPrint(value) {
    console.log(value);
}
// Generics & Templates
// inferred to return T[]
function insertAtBeginning(array, value) {
    var newArray = __spreadArray([value], array, true);
    return newArray;
}
var demoArray = [1, 2, 3];
var updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
// This wont work as we made demo array use numbers
// updatedArray[0].split(''); // Error: .split does not exist on number type
var stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
stringArray[0].split(''); // works fine
// Classes
var Student = /** @class */ (function () {
    function Student(first, last, age, courses) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }
    Student.prototype.enroll = function (courseName) {
        this.courses.push(courseName);
    };
    Student.prototype.listCourses = function () {
        return this.courses.slice();
    };
    return Student;
}());
var student = new Student('Dave', 'Smith', 32, ['Angular']);
student.enroll('React');
console.log(student.listCourses());
var max;
max = {
    firstName: 'Max',
    age: 32
};
function greet(person) {
    console.log('Hello ' + person.firstName);
}
greet(max);
// Implements
var Instructor = /** @class */ (function () {
    function Instructor(first, last, age) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
    }
    return Instructor;
}());
