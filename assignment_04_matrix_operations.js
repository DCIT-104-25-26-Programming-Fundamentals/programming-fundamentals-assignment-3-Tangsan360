// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, cols, prefix = 'Enter') {
	const mat = [];
	for (let r = 0; r < rows; r++) {
		const line = readlineSync.question(`${prefix} row ${r + 1}: `).trim();
		const parts = line.split(/\s+/).map(Number);
		if (parts.length !== cols || parts.some(x => Number.isNaN(x))) {
			console.log(`Invalid input. Please enter exactly ${cols} numeric values separated by spaces.`);
			r--;
			continue;
		}
		mat.push(parts);
	}
	return mat;
}

function transposeMatrix(matrix) {
	const rows = matrix.length;
	const cols = rows === 0 ? 0 : matrix[0].length;
	const result = [];
	for (let c = 0; c < cols; c++) {
		const row = [];
		for (let r = 0; r < rows; r++) {
			row.push(matrix[r][c]);
		}
		result.push(row);
	}
	return result;
}

function addMatrices(A, B) {
	const m = A.length;
	const n = m === 0 ? 0 : A[0].length;
	if (B.length !== m || (B[0] && B[0].length) !== n) return null;
	const C = [];
	for (let i = 0; i < m; i++) {
		const row = [];
		for (let j = 0; j < n; j++) {
			row.push(A[i][j] + B[i][j]);
		}
		C.push(row);
	}
	return C;
}

function multiplyMatrices(A, B) {
	const m = A.length;
	const n = m === 0 ? 0 : A[0].length;
	const nB = B.length;
	const p = (B[0] && B[0].length) || 0;
	if (n !== nB) return null;
	const C = [];
	for (let i = 0; i < m; i++) {
		const row = [];
		for (let j = 0; j < p; j++) {
			let sum = 0;
			for (let k = 0; k < n; k++) {
				sum += A[i][k] * B[k][j];
			}
			row.push(sum);
		}
		C.push(row);
	}
	return C;
}

function printMatrix(matrix) {
	if (matrix.length === 0) {
		console.log('<empty>');
		return;
	}
	const rows = matrix.length;
	const cols = matrix[0].length;
	const widths = new Array(cols).fill(0);
	for (let j = 0; j < cols; j++) {
		for (let i = 0; i < rows; i++) {
			const s = String(matrix[i][j]);
			if (s.length > widths[j]) widths[j] = s.length;
		}
	}
	for (let i = 0; i < rows; i++) {
		let line = '';
		for (let j = 0; j < cols; j++) {
			const s = String(matrix[i][j]);
			line += s.padStart(widths[j] + 1, ' ');
		}
		console.log(line.trimStart());
	}
}

function main() {
	// Part A: Transpose
	console.log('\n--- Part A: Transpose a Matrix ---');
	const mA = readlineSync.questionInt('Enter number of rows: ');
	const nA = readlineSync.questionInt('Enter number of columns: ');
	if (mA <= 0 || nA <= 0) {
		console.log('Error: rows and columns must be positive integers.');
	} else {
		const A = readMatrix(mA, nA);
		console.log('\nOriginal Matrix:');
		printMatrix(A);
		const At = transposeMatrix(A);
		console.log('\nTransposed Matrix:');
		printMatrix(At);
	}

	// Part B: Add two matrices
	console.log('\n--- Part B: Add Two Matrices ---');
	const mB = readlineSync.questionInt('Enter number of rows: ');
	const nB = readlineSync.questionInt('Enter number of columns: ');
	if (mB <= 0 || nB <= 0) {
		console.log('Error: rows and columns must be positive integers.');
	} else {
		console.log('Matrix A:');
		const A = readMatrix(mB, nB, 'Enter');
		console.log('Matrix B:');
		const B = readMatrix(mB, nB, 'Enter');
		const S = addMatrices(A, B);
		if (S === null) console.log('Error: Matrices must have the same dimensions.');
		else {
			console.log('\nSum:');
			printMatrix(S);
		}
	}

	// Part C: Multiply two matrices
	console.log('\n--- Part C: Multiply Two Matrices ---');
	const mC = readlineSync.questionInt('Enter rows for matrix A (M): ');
	const nC = readlineSync.questionInt('Enter columns for matrix A / rows for matrix B (N): ');
	const pC = readlineSync.questionInt('Enter columns for matrix B (P): ');
	if (mC <= 0 || nC <= 0 || pC <= 0) {
		console.log('Error: dimensions must be positive integers.');
	} else {
		console.log('Matrix A:');
		const A = readMatrix(mC, nC, 'Enter');
		console.log('Matrix B:');
		const B = readMatrix(nC, pC, 'Enter');
		const P = multiplyMatrices(A, B);
		if (P === null) console.log('Error: Number of columns in A must equal number of rows in B.');
		else {
			console.log('\nProduct A x B:');
			printMatrix(P);
		}
	}
}

if (require.main === module) main();

module.exports = { readMatrix, transposeMatrix, addMatrices, multiplyMatrices, printMatrix };

