// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 3
// =============================================================================
//
// TASK: Array Statistics Calculator
//
// Write a JavaScript program that reads a collection of numbers from the user
// and computes key statistical values using separate functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_03_array_statistics.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLE
// -----------------------------------------------------------------------------
//
//   How many numbers? 5
//   Enter number 1: 4
//   Enter number 2: 7
//   Enter number 3: 2
//   Enter number 4: 9
//   Enter number 5: 1
//
//   Results:
//   Sum:     23
//   Average: 4.6
//   Maximum: 9
//   Minimum: 1
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement each calculation in its own function (see scaffold).
// - You may NOT use JavaScript's built-in array methods like reduce(),
//   Math.max(), or Math.min(). Implement the logic yourself using loops.
// - N must be a positive integer. If the user enters 0 or a negative number,
//   print an error message and stop.
//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readlineSync = require('readline-sync');

function calculateSum(arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
}

function calculateAverage(arr) {
	if (arr.length === 0) return 0;
	return calculateSum(arr) / arr.length;
}

function findMax(arr) {
	if (arr.length === 0) return undefined;
	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > max) max = arr[i];
	}
	return max;
}

function findMin(arr) {
	if (arr.length === 0) return undefined;
	let min = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < min) min = arr[i];
	}
	return min;
}

function main() {
	const n = readlineSync.questionInt('How many numbers? ');
	if (!Number.isInteger(n) || n <= 0) {
		console.log('Error: N must be a positive integer.');
		return;
	}
	const nums = [];
	for (let i = 0; i < n; i++) {
		const value = readlineSync.questionFloat(`Enter number ${i + 1}: `);
		nums.push(value);
	}

	const sum = calculateSum(nums);
	const avg = calculateAverage(nums);
	const max = findMax(nums);
	const min = findMin(nums);

	console.log('\nResults:');
	console.log('Sum:     ' + sum);
	console.log('Average: ' + avg);
	console.log('Maximum: ' + max);
	console.log('Minimum: ' + min);
}

if (require.main === module) main();

module.exports = { calculateSum, calculateAverage, findMax, findMin };


