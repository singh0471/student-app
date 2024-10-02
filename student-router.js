const Student = require("./student.js");

const getAllStudents = (req, res) => {
  try {
    const allStudents = Student.getAllStudents();
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.error(error);
  }
};

const getStudentByID = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const studentByID = Student.getStudentByID(id);
    if (!studentByID) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(studentByID);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.error(error);
  }
};

const createNewStudent = (req, res) => {
  try {
    const { firstName, lastName, dob, semesterCGPA, yearOfEnrollment, yearOfPassing } = req.body;

    if (!firstName || !lastName || !dob || !Array.isArray(semesterCGPA) || !yearOfEnrollment || !yearOfPassing) {
      return res.status(400).json({ error: "Missing required fields or invalid data format" });
    }

    const newStudent = Student.newStudent(firstName, lastName, dob, semesterCGPA, yearOfEnrollment, yearOfPassing);

    if (!newStudent) {
      return res.status(400).json({ error: "Student could not be created" });
    }

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.error(error);
  }
};

const updateStudentByID = (req, res) => {
  try {
    const { parameter, value } = req.body;
    const id = parseInt(req.params.id);

    if (isNaN(id) || typeof parameter !== "string" || typeof value !== "string") {
      return res.status(400).json({ error: "Invalid inputs" });
    }

    const updatedStudent = Student.updateStudentByID(id, parameter, value);

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found or update failed" });
    }

    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.error(error);
  }
};

const deleteStudentWithID = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const deleted = Student.deleteStudentByID(id);

    if (!deleted) {
      return res.status(404).json({ error: "Student not found or deletion failed" });
    }

    res.status(200).json({ message: `Student with ID ${id} has been deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.error(error);
  }
};

module.exports = { getAllStudents, getStudentByID, createNewStudent, updateStudentByID, deleteStudentWithID };

