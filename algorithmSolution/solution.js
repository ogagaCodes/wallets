// TO TEST please run 
// "npm run solve:algo" 
// from terminal

function diagonalDifference(arr) {
    const n = arr.length;
    let leftToRightSum = 0;
    let rightToLeftSum = 0;
// Using greedy algorithm from observation

    for (let i = 0; i < n; i++) {
        leftToRightSum += arr[i][i];
        rightToLeftSum += arr[i][n - 1 - i];
    }
 
    return Math.abs(leftToRightSum - rightToLeftSum);
}

// TEST CASES

const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [9, 8, 9]
];

const matrix2 = [
    [1, 2, 9],
    [4, 5, 6],
    [8, 8, 9]
];

const matrix3 = [
    [1, 2, 9, 8],
    [4, 5, 6, 0],
    [8, 8, 9, 7],
    [8, 8, 9, 7],
];

// CASE 1
const result = diagonalDifference(matrix1); // => 2
console.log("CASE 1 : = " , result); // => 2

// CASE 2
const result2 = diagonalDifference(matrix2); // => 7
console.log("CASE 2 : = " , result2); // => 7

// CASE 3
const result3 = diagonalDifference(matrix3); // => 8
console.log("CASE 3 : = " , result3); // => 8