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


   // React.useEffect(() => {
    //     // axios.get("/recent", {}).then(res => console.log(res)).catch( err => console.log(err))
    //     const socket = socketIOclient.connect(ENDPOINT);
    //     socket.on("connect", function() {
    //         socket.send("hi");
    //         socket.on("operation", function(op: string[]) {

    //         })
    //     })
    // }, [])
