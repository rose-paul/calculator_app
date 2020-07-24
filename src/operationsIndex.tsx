import * as React from "react";
import axios from "axios";

const OperationsIndex = () => {
    // do an axios call to get the operations and render
    React.useEffect(() => {
        axios.get("/recent", {}).then(res => console.log(res)).catch( err => console.log(err))
    }, [])
    return (<div>
        results here
    </div>)
}

export default OperationsIndex;
