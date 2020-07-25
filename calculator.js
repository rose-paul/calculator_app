const validOperations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function subtract(a, b) {
  return a - b;
}

function calculate(operations) {
  // frontend compresses numbers together ([1, 0] becomes [10])
  operations = compress(operations);
  // assuming start with a number, otherwise invalid input
  let res = Number(operations[0]);

  for (let i = 1; i < operations.length - 1; i++) {
    let currVal = operations[i];
    let nextVal = operations[i + 1];

    if (nextVal === "(") {
      // find where the closing braket is
      let j = findClosing(operations, i);
      let subCalculation = operations.slice(i + 2, j);
      // recursively call on that sub arr
      nextVal = calculate(subCalculation);
      // jump foward, so we skip that subarr of operations
      i = j;
    }
    if (currVal in validOperations) {
      // key into validOperations to get the currect function, passing in current value and next number
      res = validOperations[currVal](res, Number(nextVal));
    }
  }

  return res;
}

// helper to find closing bracket
function findClosing(arr, i) {
  let j = i + 2;
  let openCount = 1;
  while (openCount > 0) {
    if (arr[j] === "(") {
      openCount++;
    } else if (arr[j] === ")") {
      openCount--;
    }
    j++;
  }
  return j - 1;
}

// helper to compress numbers
function compress(arr) {
  let newArr = [];
  let i = 0;
  while (i < arr.length) {
    if (!isNaN(arr[i])) {
      let j = i;
      while (!isNaN(arr[j])) {
        j++;
      }
      newArr.push(arr.slice(i, j).join(""));
      i = j;
    } else {
      newArr.push(arr[i]);
      i++;
    }
  }
  return newArr;
}

module.exports = {
  calculate
}
