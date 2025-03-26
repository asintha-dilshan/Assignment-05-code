/*********************************************************************************
 *  WEB700 – Assignment 2
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Asintha Dilshan Jayasekara Student ID: 170388235 Date: 16/02/2025
 *
 ********************************************************************************/

const fs = require("fs");
const path = require("path");

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "../data/courses.json"),
      "utf8",
      (err, courseData) => {
        if (err) {
          reject("unable to load courses");
          return;
        }

        fs.readFile(
          path.join(__dirname, "../data/students.json"),
          "utf8",
          (err, studentData) => {
            if (err) {
              reject("unable to load students");
              return;
            }

            dataCollection = new Data(
              JSON.parse(studentData),
              JSON.parse(courseData)
            );
            resolve();
          }
        );
      }
    );
  });
};

module.exports.getAllStudents = function () {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(dataCollection.students);
  });
};

module.exports.getTAs = function () {
  return new Promise(function (resolve, reject) {
    var filteredStudents = [];

    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].TA == true) {
        filteredStudents.push(dataCollection.students[i]);
      }
    }

    if (filteredStudents.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(filteredStudents);
  });
};

module.exports.getCourses = function () {
  return new Promise((resolve, reject) => {
    if (dataCollection.courses.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(dataCollection.courses);
  });
};

module.exports.getStudentByNum = function (num) {
  return new Promise(function (resolve, reject) {
    var foundStudent = null;

    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].studentNum == num) {
        foundStudent = dataCollection.students[i];
      }
    }

    if (!foundStudent) {
      reject("query returned 0 results");
      return;
    }

    resolve(foundStudent);
  });
};

module.exports.getStudentsByCourse = function (course) {
  return new Promise(function (resolve, reject) {
    var filteredStudents = [];

    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].course == course) {
        filteredStudents.push(dataCollection.students[i]);
      }
    }

    if (filteredStudents.length == 0) {
      reject("query returned 0 results");
      return;
    }

    resolve(filteredStudents);
  });
};

module.exports.addStudent = function (studentData) {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject("Data not initialized");
      return;
    }

    studentData.TA = studentData.TA ? true : false;
    studentData.studentNum = dataCollection.students.length + 1;
    studentData.course = parseInt(studentData.course);

    // Maintain consistent key order
    const orderedStudent = {
      studentNum: studentData.studentNum,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      addressStreet: studentData.addressStreet,
      addressCity: studentData.addressCity,
      addressProvince: studentData.addressProvince,
      TA: studentData.TA,
      status: studentData.status,
      course: studentData.course,
    };

    // Append new student to in-memory collection
    dataCollection.students.push(orderedStudent);

    // Correct file path: Moves up one level from modules/ to project root, then into data/
    const filePath = path.join(__dirname, "../data/students.json");

    // Write updated students array to the file
    fs.writeFile(
      filePath,
      JSON.stringify(dataCollection.students, null, 4),
      "utf8",
      (err) => {
        if (err) {
          reject("Unable to write to students.json: " + err);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports.getCourseById = function (id) {
  return new Promise(function (resolve, reject) {
    var foundCourse = null;

    for (let i = 0; i < dataCollection.courses.length; i++) {
      if (dataCollection.courses[i].courseId == id) {
        foundCourse = dataCollection.courses[i];
      }
    }

    if (!foundCourse) {
      reject("query returned 0 results");
      return;
    }

    resolve(foundCourse);
  });
};

module.exports.updateStudent = function (studentData) {
  return new Promise((resolve, reject) => {
    if (!dataCollection) {
      reject("Data not initialized");
      return;
    }

    let found = false;

    for (let i = 0; i < dataCollection.students.length; i++) {
      if (dataCollection.students[i].studentNum == studentData.studentNum) {
        studentData.TA = studentData.TA ? true : false;
        dataCollection.students[i] = studentData;
        found = true;
        break;
      }
    }

    if (!found) {
      reject("Student not found");
      return;
    }

    const filePath = path.join(__dirname, "../data/students.json");

    fs.writeFile(
      filePath,
      JSON.stringify(dataCollection.students, null, 4),
      "utf8",
      (err) => {
        if (err) {
          reject("Unable to write to students.json: " + err);
        } else {
          resolve();
        }
      }
    );
  });
};
