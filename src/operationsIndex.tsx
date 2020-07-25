import * as React from "react";
import axios from "axios";
import * as socketIOclient from "socket.io-client";
const ENDPOINT = "http://localhost:8080/";
const OperationsIndex = (props: {recentTenOps: string[]}) => {
    // do an axios call to get the operations and render
    const [display, setDisplay] = React.useState([]);
 

    return (<div>
        results here
    </div>)
}

export default OperationsIndex;


   // React.useEffect(() => {
    //     // axios.get("/recent", {}).then(res => console.log(res)).catch( err => console.log(err))
    //     const socket = socketIOclient.connect(ENDPOINT);
    //     socket.on("connect", function() {
    //         socket.send("hi");
    //         socket.on("operation", function(op: string[]) {

    //         })
    //     })
    // }, [])
