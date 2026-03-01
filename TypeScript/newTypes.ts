// LITERAL TYPES
let name1: string = "Bob";
name1 = "Logan"; // I CAN CHANGE THE NAME OF THIS TO ANY 'STRING' TYPE BECAUSE

let name2: "Bob" = "Bob";
name2 = "Logan"; // HOWEVER, THIS EXAMPLE WONT WORK BECAUSE I EXPLICITLY TOLD IT TO BE
// A TYPE OF STRING THAT IS 'BOB'

//UNION TYPES
// UNION TYPE IS SET BY USING THE PIPE CHARACTER -> '|'
type UserRole = "guest" | "admin";
let userRole1: UserRole = "guest"; // WORKS BECAUSE 'guest' IS A ONE OF THE LITERAL TYPES OF OUR UNION TYPE 'UserRole'
let userRole2: UserRole = "jibberish"; // ERRORS BECAUSE ITS NOT PART OF THE UNION

// UNION INSIDE AN OBJECT
type User = {
  id: number;
  name: string;
  // role: "guest" | "admin"
  // OR
  role: UserRole;
};

const user1: User = {
  id: 1
  name: "Bob",
  role: "admin",
};

// UNION TYPE ACCEPTED AS PARAMETERS
// FUNCTION TO GET A USER DETAILS BASED ON NAME (string in this context) OR its Role
function getUserDetail(identifier: number | UserRole) {}

getUserDetail(1); // NO ERRORS BECAUSE WE'RE PASSING IN A NUMBER TYPE (THAT IT ACCEPTS)
getUserDetail("admin"); // NO ERRORS BECAUSE WE'RE PASSING IN A USER ROLE LITERAL (THAT IT ACCEPTS)
getUserDetail("infiltrator"); // ERRORS BECAUSE IT DOESNT SATISFIED THE PARAMETER'S TYPE CRITERIA (NOT A NUMBER OR A USERROLE)

//FUNCTION RETURN TYPES
const add = (a: number, b: number): number => { // BY ADDING A TYPE BEFORE THE BRACKET, IT SPECIFIES THE RETURN TYPE OF THE FUNCTION
  return a + b
}

// VOID RETURN TYPE (FOR NON RETURNING FUNCTIONSS)
const greet = (name: string): void => {
  console.log(`Hi, ${name}!`)
}

// 'ANY' TYPE (BAD)
let value: any = 1
value = 'HI'; // WOULD USUALLY THROW AN ERROR IF EXPLICITLY TYPED AS NUMBER
value.toUpperCase; // SAME AS THIS

// UTILITY TYPES
// PARTIAL TYPE (USEFUL FOR OBJECT UPDATES (NOT UPDATING ALL PROPERTIES))
type Todo = {
    title: string,
    description: string
}

// function to update an existing Todo object
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) { 
    // PARTIAL TYPE AUTOMATICALLY SETS THE PROPERTIES OBJECT TO OPTIONAL
    // SO YOU CAN TARGET ANY PROPERTIES OF THE INITIAL TODO TYPE AND STILL HAVE TYPE SAFETY
    return {...todo, ...fieldsToUpdate}
}

// ORIGINAL TODO
const todo1: Todo = {
    title: 'Clean the house',
    description: 'Wipe floor'
}

// UPDATED TOODO
const todo2 = updateTodo(todo1, {description: "Throw trash"}) // THIS WILL CREATE UPDATE THE DESCRIPTION OF THE ORIGINAL TODO
const todo3 = updateTodo(todo1, {timeInSeconds: 600}) // ERRORS OUT BECAUSE 'TODO' OR THE PARTIAL TYPE DOESNT HAVE THE 'timeInSeconds' PROPERTY

// OMIT TYPE (GOOD FOR REQUIRING 'SOME' OF THE PROPERTIES OF A CUSTOM TYPE)
// TAKES A CUSTOM TYPE AND A STRING NAME OF THE 'PROPERTY' U WANT TO REMOVE FROM THE CUSTOM TYPE
function createBathingTodo(untitledTodo: Omit<Todo, "title">): Todo {
    return {title: "Take a bath", ...untitledTodo}
}

const bathTodo = createBathingTodo({description: "Wash yourself cuh"})
// bathTodo WILL BE = {title: "Take a bath", description: "Wash yourself cuh"}
const bathTodo2 = createBathingTodo({description: "Wash yourself cuh"}) 
// bathTodo2 ERRORS BECAUSE THE 'EXPECTED' PARAMETER TYPE OF 'createBathingTodo'
// IS A 'Todo' TYPE WITHOUT A TITLE (BECAUSE TITLE IS 'OMITTED' FROM THE PARAMETER)