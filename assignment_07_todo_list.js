// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 7
// =============================================================================
//
// TASK: Console-Based To-Do List Application
//
// Build a simple to-do list program that runs entirely in the console and
// allows the user to manage their tasks interactively using a menu.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_07_todo_list.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Task
//      - Prompt the user to type a task description.
//      - Add it to the array and confirm it was added.
//
//   2. View All Tasks
//      - Display all tasks currently in the array, numbered from 1.
//      - If the array is empty, print a friendly message saying so.
//
//   3. Delete a Task
//      - Show the list of tasks with their numbers.
//      - Ask the user which task number they want to remove.
//      - Remove the task and confirm the deletion.
//      - If the task number is invalid, print an error message.
//
//   4. Quit
//      - End the program with a farewell message.
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        TO-DO LIST MENU
//   ============================
//   1. Add task
//   2. View tasks
//   3. Delete task
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Enter task: Buy groceries
//   Task added: "Buy groceries"
//
//   Enter your choice (1-4): 2
//   Your Tasks:
//   1. Buy groceries
//   2. Study for exams
//
//   Enter your choice (1-4): 3
//   Enter task number to delete: 1
//   Task "Buy groceries" has been removed.
//
//   Enter your choice (1-4): 4
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store tasks in a JavaScript array (e.g. let tasks = []).
// - Use a loop to keep the menu running until the user chooses to quit.
// - Each feature MUST be implemented in its own function (see scaffold below).
// - Handle invalid menu choices gracefully (print an error, do not crash).
// - To remove an item from an array by index, use: tasks.splice(index, 1)
//
//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readlineSync = require('readline-sync');

function addTask(tasks, description) {
	if (typeof description !== 'string' || description.trim() === '') return false;
	tasks.push(description.trim());
	return true;
}

function viewTasks(tasks) {
	if (!Array.isArray(tasks) || tasks.length === 0) {
		console.log('No tasks found.');
		return;
	}
	console.log('Your Tasks:');
	for (let i = 0; i < tasks.length; i++) {
		console.log(`${i + 1}. ${tasks[i]}`);
	}
}

function deleteTask(tasks, index) {
	if (!Number.isInteger(index) || index < 1 || index > tasks.length) return null;
	const removed = tasks.splice(index - 1, 1)[0];
	return removed;
}

function printMenu() {
	console.log('\n============================');
	console.log('     TO-DO LIST MENU');
	console.log('============================');
	console.log('1. Add task');
	console.log('2. View tasks');
	console.log('3. Delete task');
	console.log('4. Quit');
}

function main() {
	const tasks = [];
	while (true) {
		printMenu();
		const choice = readlineSync.questionInt('Enter your choice (1-4): ');
		switch (choice) {
			case 1: {
				const desc = readlineSync.question('Enter task: ');
				if (addTask(tasks, desc)) console.log(`Task added: "${desc.trim()}"`);
				else console.log('Error: Task description cannot be empty.');
				break;
			}
			case 2:
				viewTasks(tasks);
				break;
			case 3: {
				if (tasks.length === 0) {
					console.log('No tasks to delete.');
					break;
				}
				viewTasks(tasks);
				const idx = readlineSync.questionInt('Enter task number to delete: ');
				const removed = deleteTask(tasks, idx);
				if (removed === null) console.log('Error: Invalid task number.');
				else console.log(`Task "${removed}" has been removed.`);
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

module.exports = { addTask, viewTasks, deleteTask };


