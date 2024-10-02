const express = require("express");
const bodyParser = require("body-parser");
const StudentRouter = require("./student-router.js");

const app = express();
const PORT = 3000;

// Middleware  
app.use(bodyParser.json());  

// Get all students
app.get("/students", StudentRouter.getAllStudents);

// Get student by ID
app.get("/students/:id", StudentRouter.getStudentByID);

// Create new student
app.post("/students", StudentRouter.createNewStudent);

//update new Student
app.put("/students/:id",StudentRouter.updateStudentByID);

// delete student with student id
app.delete("/students/:id",StudentRouter.deleteStudentWithID);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
