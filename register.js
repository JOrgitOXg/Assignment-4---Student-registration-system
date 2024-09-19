const inputName = document.getElementById('txtName');
const inputEmail = document.getElementById('txtEmail');
const inputAge = document.getElementById('txtAge');
const inputGender = document.getElementById('txtGender');
const inputGrade1 = document.getElementById('txtGrade1');
const inputGrade2 = document.getElementById('txtGrade2');
const inputGrade3 = document.getElementById('txtGrade3');
const registerBtn = document.getElementById('btnRegister');
const loginForm = document.getElementById('loginForm');

let students = [];
let studentIdCounter = 1;

function Student(id, name, email, age, gender, g1, g2, g3) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.g1 = g1;
    this.g2 = g2;
    this.g3 = g3;
    this.gpa = function () {
        let sum = (Number(this.g1) + Number(this.g2) + Number(this.g3)) / 3;
        return sum.toFixed(2);
    };
}

function validateFields() {
    if (inputName.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(inputName.value)) {
        alert("Name is required and must contain only letters.");
        return false;
    }
    if (inputEmail.value.trim() === "" || !/\S+@\S+\.\S+/.test(inputEmail.value)) {
        alert("Email is required and must be a valid email address.");
        return false;
    }
    if (isNaN(inputAge.value) || inputAge.value <= 0) {
        alert("Age must be a number greater than 0.");
        return false;
    }
    const validGenders = ["M", "F"];
    if (!validGenders.includes(inputGender.value.trim().toUpperCase())) {
        alert("Gender must be 'M' or 'F'.");
        return false;
    }
    const grades = [inputGrade1.value, inputGrade2.value, inputGrade3.value];
    for (let grade of grades) {
        if (grade.trim() === "" || isNaN(grade) || grade < 0 || grade > 10) {
            alert("Grades must be numbers between 0 and 10 and cannot be empty.");
            return false;
        }
    }
    return true;
}

function registerStudent() {
    if (!validateFields()) return;

    let newStudent = new Student(
        studentIdCounter++,
        inputName.value,
        inputEmail.value,
        inputAge.value,
        inputGender.value,
        inputGrade1.value,
        inputGrade2.value,
        inputGrade3.value
    );
    students.push(newStudent);
    displayStudents();
    clearFields();
}

function clearFields() {
    inputName.value = "";
    inputEmail.value = "";
    inputAge.value = "";
    inputGender.value = "";
    inputGrade1.value = "";
    inputGrade2.value = "";
    inputGrade3.value = "";
}

function handleLogin() {
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === "" || password === "") {
                alert("Both fields are required.");
                return;
            }

            sessionStorage.setItem('loggedIn', 'true'); 
            window.location.href = 'registration.html'; 
        });
    }
}

function checkAuthentication() {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

window.onload = function() {
    if (window.location.pathname.endsWith('registration.html')) {
        checkAuthentication();
        registerBtn.addEventListener('click', registerStudent);
    } else if (window.location.pathname.endsWith('index.html')) {
        handleLogin();
    }
};
