/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const App_1 = __webpack_require__(/*! ./src/App */ "./src/App.tsx");
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(React.createElement(App_1.default, null), document.getElementById("root"));
});


/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const header_1 = __webpack_require__(/*! ./header */ "./src/header.tsx");
const calculator_1 = __webpack_require__(/*! ./calculator */ "./src/calculator.tsx");
const App = () => (React.createElement("div", { className: "App" },
    React.createElement(header_1.default, null),
    React.createElement(calculator_1.default, null)));
exports.default = App;


/***/ }),

/***/ "./src/calculateFunc.ts":
/*!******************************!*\
  !*** ./src/calculateFunc.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate = void 0;
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
exports.calculate = calculate;
// helper to find closing bracket
function findClosing(arr, i) {
    let j = i + 2;
    let openCount = 1;
    while (openCount > 0) {
        if (arr[j] === "(") {
            openCount++;
        }
        else if (arr[j] === ")") {
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
        if (!isNaN(Number(arr[i]))) {
            let j = i;
            while (!isNaN(Number(arr[j]))) {
                j++;
            }
            newArr.push(arr.slice(i, j).join(""));
            i = j;
        }
        else {
            newArr.push(arr[i]);
            i++;
        }
    }
    return newArr;
}


/***/ }),

/***/ "./src/calculator.tsx":
/*!****************************!*\
  !*** ./src/calculator.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const calculateFunc_1 = __webpack_require__(/*! ./calculateFunc */ "./src/calculateFunc.ts");
const Calculator = () => {
    const [operations, setOperations] = React.useState([]);
    const [result, setResult] = React.useState(null);
    function updateOps(type) {
        if (type === "CA") {
            return setOperations([]);
        }
        else if (type === "D1") {
            let newOps = [...operations];
            newOps.pop();
            return setOperations(newOps);
        }
        else if (type === "=") {
            const currResult = calculateFunc_1.calculate(operations);
            return setResult(currResult);
        }
        else {
            return setOperations([...operations, type]);
        }
    }
    return (React.createElement("div", { className: "wrapper" },
        React.createElement("div", null,
            React.createElement("span", null, operations.map((op) => op)),
            React.createElement("span", null, " = "),
            React.createElement("span", null, result)),
        React.createElement("div", { className: "calculator" },
            React.createElement("div", null,
                React.createElement("button", { onClick: () => updateOps("0") }, "0"),
                React.createElement("button", { onClick: () => updateOps("1") }, "1"),
                React.createElement("button", { onClick: () => updateOps("2") }, "2"),
                React.createElement("button", { onClick: () => updateOps("3") }, "3")),
            React.createElement("div", null,
                React.createElement("button", { onClick: () => updateOps("4") }, "4"),
                React.createElement("button", { onClick: () => updateOps("5") }, "5"),
                React.createElement("button", { onClick: () => updateOps("6") }, "6"),
                React.createElement("button", { onClick: () => updateOps("7") }, "7")),
            React.createElement("div", null,
                React.createElement("button", { onClick: () => updateOps("8") }, "8"),
                React.createElement("button", { onClick: () => updateOps("9") }, "9"),
                React.createElement("button", { onClick: () => updateOps("+") }, "+"),
                React.createElement("button", { onClick: () => updateOps("-") }, "-")),
            React.createElement("div", null,
                React.createElement("button", { onClick: () => updateOps("/") }, "/"),
                React.createElement("button", { onClick: () => updateOps("*") }, "*"),
                React.createElement("button", { onClick: () => updateOps("(") }, "("),
                React.createElement("button", { onClick: () => updateOps(")") }, ")")),
            React.createElement("div", null,
                React.createElement("button", { onClick: () => updateOps("CA") }, "CA"),
                React.createElement("button", { onClick: () => updateOps("D1") }, "Del"),
                React.createElement("button", { onClick: () => updateOps("=") }, "=")))));
};
exports.default = Calculator;


/***/ }),

/***/ "./src/header.tsx":
/*!************************!*\
  !*** ./src/header.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Header = () => (React.createElement("header", null,
    React.createElement("h2", null, "Welcome to Calculate Stuff"),
    React.createElement("p", null, "This is the premier site for calculating your stuff and seeing the most recent 10 calculations.")));
exports.default = Header;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map