import * as React from "react";
import Header from './header'
import Calculator from "./calculator";
import OperationsIndex from './operationsIndex';
import useOps from "./_useOps"

const App = () => {
    const { recentTenOps, sendOp } = useOps();
    return (
    <div className="App">
        <Header /> 
        <Calculator sendOp={sendOp} />
        <OperationsIndex recentTenOps={recentTenOps} />
    </div>
    )
}



export default App;