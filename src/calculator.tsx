import * as React from "react";

const Calculator = (props: { sendOp: Function }) => {
  const [operations, setOperations] = React.useState([]);

  function updateOps(type: String) {
    if (type === "CA") {
      // CLEAR ALL
      return setOperations([]);
    } else if (type === "D1") {
      // BACKSPACE/DELETE ONE
      let newOps = [...operations];
      newOps.pop();
      return setOperations(newOps);
    } else if (type === "=") {
      // REQ TO BACKEND FOR CALCULATION
      props.sendOp(operations);
    } else {
      return setOperations([...operations, type]); // ADDING TO CALCULATION STACK
    }
  }

  return (
    <div className="wrapper">
      <div>
        <span>{operations.map((op) => op)}</span>
      </div>
      <div className="calculator">
        <div>
          <button onClick={() => updateOps("0")}>0</button>
          <button onClick={() => updateOps("1")}>1</button>
          <button onClick={() => updateOps("2")}>2</button>
          <button className="bottom-left" onClick={() => updateOps("3")}>3</button>
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
};

export default Calculator;