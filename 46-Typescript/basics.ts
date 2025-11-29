// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives
let age: number;
age = 12;

let userName: string;

userName = 'Dave';

let isInstructor: boolean;
isInstructor = false;

// More complex types

let hobbies: string[];
hobbies = ['Sports', 'Cooking'];

let person: {
   name: string;
   age: number;
};

type Person = {
      name: string;
      age: number;
   };

// Create type and variable same time
person = {
   name:  'Dave', 
   age: 55
};

// or use the type:
let person2: Person = {
   name: 'Mary',
   age: 30
};

let people: Person[];

let course: string = 'React -= The Complete Guide';

// course = 13;   can't do this because course is a string type

let course2: string | number = 'React -= The Complete Guide';

course2 = 13;   

// function takes 2 numbers and returns a number
function add( a: number, b: number): number {
   return a + b;
}

function myPrint(value: any):void {
   console.log(value);
}


// Generics & Templates

// inferred to return T[]
function insertAtBeginning<T>(array: T[], value: T) {
   const newArray = [value, ...array];
   return newArray;
}

const demoArray = [1,2,3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]

// This wont work as we made demo array use numbers
// updatedArray[0].split(''); // Error: .split does not exist on number type

const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
stringArray[0].split(''); // works fine

// Classes

class Student {
   firstName: string;
   lastName: string;
   age: number;
   private courses: string[];

   constructor(first: string, last: string, age: number, courses: string[]) {
      this.firstName = first;
      this.lastName = last;
      this.age = age;
      this.courses = courses;
   }

   enroll(courseName: string) {
      this.courses.push(courseName);
   }

   listCourses() {
      return this.courses.slice();
   }
}

const student = new Student('Dave', 'Smith', 32, ['Angular']);
student.enroll('React');
console.log(student.listCourses());
// student.courses; // Error: courses is private

// Interfaces

interface Human { 
   firstName: string;
   age: number;   
}     

let max: Human;

max = {
   firstName: 'Max',
   age: 32
};

function greet(person: Human) {
   console.log('Hello ' + person.firstName);
}

greet(max);

// Implements

class Instructor implements Human {
   firstName: string;
   age: number;
   lastName: string;

   constructor(first: string, last: string, age: number) {
      this.firstName = first;
      this.lastName = last;
      this.age = age;
   }
}     




   