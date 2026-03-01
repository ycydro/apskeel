// ASSIGNING VARIABLES WITH TYPESCRIPT
// RUN 'npx tsc {filename.ts} IN THE CONSOLE TO SEE IF THERE ARE ANY ERRORS

// STRING
const declaredString: string = "MyString";

// WORKS WITH LET
let str: string;

// NUMBERS
let num: number = 1;
num = "2"; // WILL FAIL BECAUSE STRING IS BEING ASSIGNED TO A NUMBER VARIABLE

// BOOLEAN
const isBoolean: boolean = true;

// OBJECTS !!!
const person1 = {
  name: "Hev",
  age: 24,
  halimaw: true,
};

// TYPESCRIPT IS SMART ENOUGH TO ASSIGN SPECIFIC TYPES TO EACH PROPERTY OF AN OBJECT
// BUT ITS BETTER TO CREATE A NEW TYPE FOR THAT SPECIFIC OBJECT

type Person = {
  name: string; // assign type property type like this
  age: number;
  halimaw: boolean;
};

const person2: Person = {
  name: "Abi",
  age: 67,
  halimaw: true,
};

const person3: Person = {
  name: "Rizzler",
  age: 12,
}; // WILL FAIL BECAUSE MISSING PROPERTY THAT IS REQUIRED FOR THE 'PERSON' TYPE

// ARRAYS!

// ARRAY OF TYPES (APPLICABLE TO OTHER TYPES)
const strings: string[] = ["str", "string", "s"];
strings.push(1); // WILL FAIL BECAUSE IM TRYING TO INSERT A NUMBER TYPE TO AN ARRAY OF STRINGS

// ARRAY OF CUSTOM TYPES
const myPeople: Person[] = [
  person2,
  { name: "Al James", age: 89, halimaw: true },
  person1,
];
// TAKE NOTE THAT EVEN THOUGH 'person1' WAS NOT EXPLICITLY TYPED A 'PERSON' TYPE, IT DOESNT GIVE AN ERROR BECAUSE IT SATISFIES THE TYPES
// OF THE PROPERTIES INSIDE A 'PERSON' TYPE

// OPTIONAL PROPERTIES ON CUSTOM OBJECT TYPE
type Shirt = {
  brand: string;
  price: number;
  isBrandNew?: boolean; // ADD A `?` IN THE PROPERTY THAT U WANT TO BE OPTIONAL
};

const shirt1: Shirt = {
  brand: "stussy",
  price: 1000,
  isBrandNew: true,
};

const shirt2: Shirt = {
  brand: "Bape",
  price: 2500,
}; // STILL WORKS WITHOUT 'isBrandNew' property
