import * as React from "react";
const OperationsIndex = (props: {recentTenOps: string[]}) => {
    // do an axios call to get the operations and render
    return (<div>
        {
            props.recentTenOps.map( op => <p>{op}</p>)
        }
    </div>)
}

export default OperationsIndex;
