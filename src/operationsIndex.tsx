import * as React from "react";
import axios from "axios";
import * as socketIOclient from "socket.io-client";
const ENDPOINT = "http://localhost:8080/";
const OperationsIndex = () => {
    // do an axios call to get the operations and render
    const [display, setDisplay] = React.useState([]);

    React.useEffect(() => {
        // axios.get("/recent", {}).then(res => console.log(res)).catch( err => console.log(err))
        const socket = socketIOclient.connect(ENDPOINT);
        socket.on("connect", function() {
            socket.send("hi");
            socket.on("operation", function(op: string[]) {

            })
        })
    }, [])

    return (<div>
        results here
    </div>)
}

export default OperationsIndex;
