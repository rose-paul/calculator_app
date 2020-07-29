import * as React from "react";

const OperationsIndex = (props: {recentTenOps: string[]}) => {
    return (
    <div>
        {
            props.recentTenOps.map( op => <p>{op}</p>)
        }
    </div>
    )
}

export default OperationsIndex;
