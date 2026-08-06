// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readlineSync = require('readline-sync');

/**
 * Generate the first n Fibonacci numbers (starting with 0, 1).
 * @param {number} n positive integer
 * @returns {number[]} array of length n (empty for n <= 0)
 */
function generateFibonacci(n) {
	if (!Number.isInteger(n) || n <= 0) return [];
	const seq = [0];
	if (n === 1) return seq;
	seq.push(1);
	for (let i = 2; i < n; i++) {
		seq.push(seq[i - 1] + seq[i - 2]);
	}
	return seq;
}

/**
 * Check whether a non-negative integer is a Fibonacci number.
 * Uses generation up to the value (iterative).
 * @param {number} x non-negative integer
 * @returns {boolean}
 */
function isFibonacci(x) {
	if (!Number.isInteger(x) || x < 0) return false;
	if (x === 0 || x === 1) return true;
	let a = 0, b = 1;
	while (b < x) {
		const next = a + b;
		a = b;
		b = next;
	}
	return b === x;
}

function main() {
	// Part A
	const n = readlineSync.questionInt('How many terms? ');
	if (!Number.isInteger(n) || n <= 0) {
		console.log('Error: N must be a positive integer.');
	} else {
		const seq = generateFibonacci(n);
		console.log('Fibonacci sequence: ' + seq.join(' '));
	}

	// Part B
	const x = readlineSync.questionInt('\nEnter a number to check: ');
	if (!Number.isInteger(x) || x < 0) {
		console.log('Error: please enter a non-negative integer.');
	} else if (isFibonacci(x)) {
		console.log(`${x} is a Fibonacci number.`);
	} else {
		console.log(`${x} is NOT a Fibonacci number.`);
	}
}

if (require.main === module) main();

module.exports = { generateFibonacci, isFibonacci };


