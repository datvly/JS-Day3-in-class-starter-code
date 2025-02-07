const members = [
    {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
    {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
];



// //OLD WAY DEMO - CONSTRUCTOR FUNCTION
// function Employee(firstName, lastName, email, birthdate, salary) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.birthdate = birthdate;
//     this.salary = salary;
//   }

//   Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
//     return new Employee(firstName, lastName, email, birthdate, salary);
//   };

//   Employee.prototype.editEmployee = function(updates) {
//     Object.assign(this, updates);
//   };

//   // Usage example:
//   const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
//   console.log(bill);

//   bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
//   console.log(bill);


////////////////////////////////////////////////////////////////////////////////////////////
//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate
// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
// 3. After step 2, console log your const and then try to console.log parts of the object
// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml of the
//    of the table to be empty and then replace it with the looped-through values of your object
////////////////////////////////////////////////////////////////////////////////////////////

class Employee {
  constructor(firstName, lastName, email, birthdate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
  }

  // Method to get all fields of the employee
  getEmployee() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthdate: this.birthdate
    };
  }

  // Static method to add a new employee to an array
  static addEmployee(employeesArray, firstName, lastName, email, birthdate) {
    const newEmployee = new Employee(firstName, lastName, email, birthdate);
    employeesArray.push(newEmployee);
    return newEmployee;
  }

  // Method to edit an existing employee's details
  editEmployee(newFirstName, newLastName, newEmail, newBirthdate) {
    this.firstName = newFirstName || this.firstName;
    this.lastName = newLastName || this.lastName;
    this.email = newEmail || this.email;
    this.birthdate = newBirthdate || this.birthdate;
  }
}

// Instantiate a new Employee with your info
const dat = new Employee("Dat", "Ly", "dat@gmail.com", "2002-10-15");

// Console log the entire object and parts of it
console.log(dat);
console.log(dat.firstName);
console.log(dat.lastName);

// Create an array of Employee objects
const employees = [
  new Employee("Jimmy", "Timmy", "Timmy@example.com", "1990-01-01"),
  new Employee("Ricky", "Picky", "Picky@example.com", "2021-08-01"),
  new Employee("Clint", "Tuttle", "Tuttle@gmail.com", "1980-08-06")
];

// Console log the array and parts of it
console.log(employees);
console.log(employees[0].getEmployee());

// Add a new employee using the static method
Employee.addEmployee(employees, "Howdy", "Partner", "Partner@example.com", "1995-05-05");
console.log(employees);

// Edit an existing employee's details
employees[0].editEmployee("Edit", "Edit_working", "Edit_working@example.com", "1999-12-31");
console.log(employees[0].getEmployee());

// Display employees in a table
function displayEmployeesInTable(employeesArray) {
  const tableBody = document.querySelector("#employeeTable tbody");
  tableBody.innerHTML = ""; // Clear existing table content

  employeesArray.forEach(employee => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.email}</td>
      <td>${employee.birthdate}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Assuming you have an HTML table with id="employeeTable"
displayEmployeesInTable(employees);
////    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS
Employee.addEmployee = function(firstName, lastName, email, birthdate) {
  return new Employee(firstName, lastName, email, birthdate);
};

Employee.prototype.editEmployee = function(updates) {
  Object.assign(this, updates);
}


//////////////////////////////////
////        Demo              ////
//////////////////////////////////

//////////////////////////////////
// //Demo 2: Callbacks
function processOrder(orderId, callback) {
  console.log(`Processing order #${orderId}...`);
  setTimeout(() => {
    callback(`Order #${orderId} processed successfully`);
  }, 2000); // Simulate 2-sec processing time
}

// Usage
processOrder(101, (confirmation) => {
  console.log('Email sent:', confirmation); 
});


function sendInvoice(clientName, callback) {
  console.log(`Invoice sent for order from ${clientName}`);
  setTimeout(() => {
    callback(`${clientName}'s invoice sent`);
  }, 1500); 
}

sendInvoice("Joe", (confirmation) => {
  console.log('Email sent:', confirmation); 
});


//////////////////////////////////////
//Demo 3: Promises
function checkInventory(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const inStock = Math.random() > 0.2; // 80% chance in stock
      inStock ? resolve(`${productId} available`) : 
                reject(`${productId} out of stock`);
    }, 1500);
  });
}

// Usage
checkInventory('WF-100')
  .then(console.log)
  .catch(console.error);


// Create verifyPayment(orderTotal) that:
function verifyPayment(orderTotal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      orderTotal < 5000 ? resolve("Payment verified") : reject("Manager approval required");
    }, 1000);
  });
}

verifyPayment(3000).then(console.log).catch(console.error);

//////////////////////////////////////
//Demo 4: Customer Onboarding

// Mock async functions  
async function verifyIdentity(customerId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      Math.random() < 0.9 
        ? resolve() 
        : reject("Identity verification failed");
    }, 1000);
  });
}

async function createAccount(customerId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ accountNumber: "ACC-" + Date.now() });
    }, 1500);
  });
}

async function sendWelcomeKit(customerId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Welcome email sent to ${customerId}@company.com`);
    }, 500);
  });
}


// Your onboarding function (unchanged)
async function onboardCustomer(customerId) {
  try {
    await verifyIdentity(customerId);
    const account = await createAccount(customerId);
    const welcomeEmail = await sendWelcomeKit(customerId);
    console.log("Account created:", account);
    console.log(welcomeEmail);
    return { success: true, account };
  } catch (error) {
    console.error('Onboarding failed:', error);
    return { success: false, error };
  }
}

// Test call of the function
onboardCustomer("CUST-12345");


//////////////////////////////////////
//Create an async function processRefund(requestId) that:

async function processRefund(requestId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Refund complete for request #${requestId}`);
    }, 3000);
  });
}

async function processRefund(requestId) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1-sec refund verification
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2-sec payment reversal
    console.log(`Refund complete for request #${requestId}`);
  } catch (error) {
    console.error(`Refund failed for request #${requestId}`);
  }
}

// Test call
processRefund("REQ-67890").then(console.log);



