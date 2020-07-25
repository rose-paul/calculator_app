import * as React from "react";
import * as socketIOclient from "socket.io-client";

const useOps = () : any => {
    const [recentTenOps, setRecent] = React.useState([]);

    let socketRef: any;

    React.useEffect(() => {
        socketRef = socketIOclient.connect(
          "http://localhost:8080/"
        );
        socketRef.current.on("operation", (operation: string) => {
        const newOps = [operation, ...recentTenOps];
        newOps.pop();
        setRecent(newOps);
    })
        return () => {
             socketRef.disconnect();
        }
    }, [])

    

    const sendOp = (operation: string[]) => {
        socketRef.emit("operation", { operation });
    }


    return { recentTenOps, sendOp };
}

export default useOps;