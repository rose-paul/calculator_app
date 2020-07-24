import * as React from "react";
import Header from './header'
import Calculator from "./calculator";
import OperationsIndex from './operationsIndex';

const App = () => (
    <div className="App">
        <Header /> 
        <Calculator />
        <OperationsIndex />
    </div>
)


export default App;