class Student {
    static #allStudents = [];
    static #studID = 0;

    #fullName;
    #age;
    #finalCGPA;
    #studentID;
    #semesterGrades;
    #finalGrade;
    #numberOfYearsToGraduate;

    constructor(studentID, firstName, lastName, fullName, DOB, age, semesterCGPA, finalCGPA, semesterGrades, finalGrade, yearOfEnrollment, yearOfPassing, numberOfYearsToGraduate) {
        this.#studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.#fullName = fullName;
        this.DOB = DOB;
        this.#age = age;
        this.semesterCGPA = semesterCGPA;
        this.#finalCGPA = finalCGPA;
        this.#semesterGrades = semesterGrades;
        this.#finalGrade = finalGrade;
        this.yearOfEnrollment = yearOfEnrollment;
        this.yearOfPassing = yearOfPassing;
        this.#numberOfYearsToGraduate = numberOfYearsToGraduate;
    }

    static newStudent(firstName, lastName, dob, semesterCGPA, yearOfEnrollment, yearOfPassing) {
        try {
            if (typeof firstName !== "string") throw new Error("Enter a valid first name");
            if (typeof lastName !== "string") throw new Error("Enter a valid last name");
            if (firstName === lastName) throw new Error("Enter a valid name");
            if (typeof dob !== "string") throw new Error("Enter a valid DOB");
            if (typeof yearOfEnrollment !== "number") throw new Error("Enter a valid year of enrollment");
            if (typeof yearOfPassing !== "number") throw new Error("Enter a valid year of passing");
            if (!Array.isArray(semesterCGPA) || semesterCGPA.length === 0) {
                throw new Error("Enter a valid CGPA list");
            }

            for (let SemCGPA of semesterCGPA) {
                if (isNaN(SemCGPA) || SemCGPA < 0 || SemCGPA > 10) {
                    throw new Error("Enter a valid CGPA value between 0 and 10");
                }
            }

            const studentID = Student.#studID++;
            const fullName = `${firstName} ${lastName}`;
            const age = this.#calculateAge(dob);
            const finalCGPA = this.#calculateFinalCGPA(semesterCGPA);
            const semesterGrades = this.#calculateSemesterGrades(semesterCGPA);
            const finalGrade = this.#calculateFinalGrade(finalCGPA);
            const numberOfYearsToGraduate = this.#calculateYearsToGraduate(yearOfEnrollment, yearOfPassing);

            let student = new Student(studentID, firstName, lastName, fullName, dob, age, semesterCGPA, finalCGPA, semesterGrades, finalGrade, yearOfEnrollment, yearOfPassing, numberOfYearsToGraduate);
            Student.#allStudents.push(student);
            return student;
        } catch (error) {
            console.error(error);
        }
    }

    static #calculateAge(dob) {
        const birthDate = new Date(dob);
        const ageDiff = Date.now() - birthDate.getTime();
        return new Date(ageDiff).getFullYear() - 1970;
    }

    static #calculateFinalCGPA(semesterCGPA) {
        let totalCGPA = 0;
        for (let i = 0; i < semesterCGPA.length; i++) {
            totalCGPA += semesterCGPA[i];
        }
        return Math.round(totalCGPA / semesterCGPA.length);
    }

    static #calculateSemesterGrades(semesterCGPA) {
        return semesterCGPA.map(cgpa => this.#getGradeForCGPA(cgpa));
    }

    static #getGradeForCGPA(cgpa) {
        if (cgpa >= 9) return "A";
        if (cgpa >= 8) return "B";
        if (cgpa >= 7) return "C";
        if (cgpa >= 6) return "D";
        if (cgpa >= 5) return "E"; 
        return "F";
    }

    static #calculateFinalGrade(finalCGPA) {
        return this.#getGradeForCGPA(finalCGPA);
    }

    static #calculateYearsToGraduate(yearOfEnrollment, yearOfPassing) {
        return yearOfPassing - yearOfEnrollment;
    }

    static getAllStudents() {
        return Student.#allStudents;
    }

    getStudentID() {
        return this.#studentID;
    }

    getFullName() {
        return this.#fullName;
    }

    getAge() {
        return this.#age;
    }

    getFinalCGPA() {
        return this.#finalCGPA;
    }

    getSemesterGrades() {
        return this.#semesterGrades;
    }

    getFinalGrade() {
        return this.#finalGrade;
    }

    getNumberOfYearsToGraduate() {
        return this.#numberOfYearsToGraduate;
    }

    updateFirstName(newFirstName) {
        try {
            if (typeof newFirstName !== "string") {
                throw new Error("Enter a valid first name");
            }
            this.firstName = newFirstName;
            this.updateFullName(this.firstName, this.lastName); 
        } catch (error) {
            console.error(error);
        }
    }
    
    updateLastName(newLastName) {
        try {
            if (typeof newLastName !== "string") {
                throw new Error("Enter a valid last name");
            }
            this.lastName = newLastName;
            this.updateFullName(this.firstName, this.lastName); 
        } catch (error) {
            console.error(error);
        }
    }

    updateFullName(firstName, lastName) {
        try{
        if (typeof firstName !== "string" || typeof lastName !== "string") {
            throw new Error("Invalid name");
        }
        this.#fullName = `${firstName} ${lastName}`;}
        catch(error){
            console.log(error);
        }
    }

    updateAge(dob) {
        this.#age = Student.#calculateAge(dob);
    }

    updateFinalCGPA(semesterCGPA) {
        this.#finalCGPA = Student.#calculateFinalCGPA(semesterCGPA);
        this.#finalGrade = Student.#calculateFinalGrade(this.#finalCGPA);
    }

    updateSemesterGrades(semesterCGPA) {
        this.#semesterGrades = Student.#calculateSemesterGrades(semesterCGPA);
    }

    updateFinalGrade() {
        this.#finalGrade = Student.#calculateFinalGrade(this.#finalCGPA);
    }

    updateNumberOfYearsToGraduate(yearOfEnrollment, yearOfPassing) {
        this.#numberOfYearsToGraduate = Student.#calculateYearsToGraduate(yearOfEnrollment, yearOfPassing);
    }

    static validateStudentID(studentID) {
        try{
        if (isNaN(studentID) || studentID < 0 || studentID >= this.#allStudents.length) {
            throw new Error("Enter a valid student ID");
        }
        
        let found = false;
        for (let student of this.#allStudents) {
            if (student.getStudentID() === studentID) {
                found = true;
                break;
            }
        }
        
        if (!found) {
            throw new Error("Student ID not found");
        }}
        catch(error){
            console.log(error);
        }
    }

    static getStudentByID(studentID) {
        try{
        this.validateStudentID(studentID);
        for (const student of this.#allStudents) {
            if (student.getStudentID() === studentID) {
                return student;
            }
        }
        return null;}
        catch(error){
            console.log(error);
        }
    }

    static updateStudentByID(studentID, parameter, value) {
        try {
            this.validateStudentID(studentID);
            const student = this.getStudentByID(studentID);
    
            if (!student) {
                console.error(`Student with ID ${studentID} does not exist`);
                return;
            }
    
            switch (parameter) {
                case "firstName":
                    student.updateFirstName(value);
                    break;
                case "lastName":
                    student.updateLastName(value);
                    break;
                case "dob":
                    student.updateAge(value);
                    break;
                case "semesterCGPA":
                    student.updateFinalCGPA(value);
                    student.updateSemesterGrades(value);
                    break;
                case "yearOfEnrollment":
                case "yearOfPassing":
                    student.updateNumberOfYearsToGraduate(student.yearOfEnrollment, student.yearOfPassing);
                    break;
                default:
                    console.error("Enter a valid parameter to change");
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    static deleteStudentByID(studentID) {

        try{
        this.validateStudentID(studentID);
        
        let index = -1;
        for (let i = 0; i < this.#allStudents.length; i++) {
            if (this.#allStudents[i].getStudentID() === studentID) {
                index = i;
                break;
            }
        }
      
        if (index !== -1) {
            this.#allStudents.splice(index, 1);
            console.log(`Student with ID ${studentID} has been deleted.`);
        } else {
            console.error(`Student with ID ${studentID} does not exist!`);
        }}
        catch(error){
            console.log(error);
        }
    }
}

module.exports = Student;
