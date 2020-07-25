import * as React from "react";
import axios from 'axios';
const Calculator = () => {
    const [operations, setOperations] = React.useState([]);
    const [result, setResult] = React.useState(null);

    function updateOps(type: String) {
        if (type === "CA") { // CLEAR ALL
            return setOperations([]);
        } else if (type === "D1") { // BACKSPACE/DELETE ONE
            let newOps = [...operations];
            newOps.pop();
            return setOperations(newOps);
        } else if (type === "=") { // REQ TO BACKEND FOR CALCULATION
            axios.post(`/operation`, { operations: operations})
            .then( res => setResult(res))
            .catch( err => console.log(err))
        } else {
            return setOperations([...operations, type]) // ADDING TO CALCULATION STACK
        }
    }

    return (
      <div className="wrapper">
        <div>
          <span>{operations.map((op) => op)}</span>
          <span> = </span>
          <span>{result}</span>
        </div>
        <div className="calculator">
          <div>
            <button onClick={() => updateOps("0")}>0</button>
            <button onClick={() => updateOps("1")}>1</button>
            <button onClick={() => updateOps("2")}>2</button>
            <button onClick={() => updateOps("3")}>3</button>
          </div>
          <div>
            <button onClick={() => updateOps("4")}>4</button>
            <button onClick={() => updateOps("5")}>5</button>
            <button onClick={() => updateOps("6")}>6</button>
            <button onClick={() => updateOps("7")}>7</button>
          </div>
          <div>
            <button onClick={() => updateOps("8")}>8</button>
            <button onClick={() => updateOps("9")}>9</button>
            <button onClick={() => updateOps("+")}>+</button>
            <button onClick={() => updateOps("-")}>-</button>
          </div>
          <div>
            <button onClick={() => updateOps("/")}>/</button>
            <button onClick={() => updateOps("*")}>*</button>
            <button onClick={() => updateOps("(")}>(</button>
            <button onClick={() => updateOps(")")}>)</button>
          </div>
          <div>
            <button onClick={() => updateOps("CA")}>CA</button>
            <button onClick={() => updateOps("D1")}>Del</button>
            <button onClick={() => updateOps("=")}>=</button>
          </div>
        </div>
      </div>
    );
}

export default Calculator;