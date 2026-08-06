// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function addStudent(records, name, id, scores) {
	if (typeof name !== 'string' || name.trim() === '') return false;
	if (!Number.isInteger(id)) return false;
	if (!Array.isArray(scores) || scores.some(s => typeof s !== 'number' || Number.isNaN(s))) return false;
	records.push({ name: name.trim(), id, scores });
	return true;
}

function average(scores) {
	if (!Array.isArray(scores) || scores.length === 0) return 0;
	let sum = 0;
	for (let i = 0; i < scores.length; i++) sum += scores[i];
	return sum / scores.length;
}

function displayAllStudents(records) {
	if (!Array.isArray(records) || records.length === 0) {
		console.log('No students have been added yet.');
		return;
	}
	console.log('Name | ID | Scores | Average');
	for (let i = 0; i < records.length; i++) {
		const s = records[i];
		const avg = average(s.scores).toFixed(2);
		console.log(`${s.name} | ${s.id} | ${s.scores.join(', ')} | ${avg}`);
	}
}

function calculateAverageForStudent(records, id) {
	if (!Number.isInteger(id)) return null;
	const student = records.find(s => s.id === id);
	if (!student) return null;
	return average(student.scores);
}

function printMenu() {
	console.log('\n===============================');
	console.log('   STUDENT RECORD SYSTEM MENU');
	console.log('===============================');
	console.log('1. Add student');
	console.log('2. Display all students');
	console.log('3. Calculate average score');
	console.log('4. Quit');
}

function main() {
	const records = [];
	while (true) {
		printMenu();
		const choice = readlineSync.questionInt('Enter your choice (1-4): ');
		switch (choice) {
			case 1: {
				const name = readlineSync.question('Student name: ');
				const id = readlineSync.questionInt('Student ID: ');
				const count = readlineSync.questionInt('How many scores? ');
				if (!Number.isInteger(count) || count < 0) {
					console.log('Error: invalid number of scores.');
					break;
				}
				const scores = [];
				for (let i = 0; i < count; i++) {
					const sc = readlineSync.questionFloat(`Enter score ${i + 1}: `);
					scores.push(sc);
				}
				if (addStudent(records, name, id, scores)) {
					console.log(`Student "${name.trim()}" added successfully.`);
				} else {
					console.log('Error: invalid student data.');
				}
				break;
			}
			case 2:
				displayAllStudents(records);
				break;
			case 3: {
				const id = readlineSync.questionInt('Enter student ID: ');
				const avg = calculateAverageForStudent(records, id);
				if (avg === null) console.log('Error: student ID not found.');
				else console.log(`${records.find(s => s.id === id).name}'s average score: ${avg.toFixed(2)}`);
				break;
			}
			case 4:
				console.log('Goodbye!');
				return;
			default:
				console.log('Invalid choice. Please enter a number between 1 and 4.');
		}
	}
}

if (require.main === module) main();

module.exports = { addStudent, displayAllStudents, calculateAverageForStudent };


