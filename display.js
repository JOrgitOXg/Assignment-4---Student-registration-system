const studentList = document.getElementById('studentList');
const totalBadge = document.getElementById('total');

function displayStudents() {
    let rows = "";

    for (let student of students) {
        rows += `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.age}</td>
                <td>${student.gender}</td>
                <td>${student.g1}</td>
                <td>${student.g2}</td>
                <td>${student.g3}</td>
                <td>${student.gpa()}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button></td>
            </tr>
        `;
    }

    studentList.innerHTML = rows;
    totalBadge.innerText = students.length;
}

function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    displayStudents(); 
}
