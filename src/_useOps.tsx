import * as React from "react";
import * as socketIOclient from "socket.io-client";
import axios from 'axios';

const useOps = () => {

    const [recentTenOps, setRecent] = React.useState([]);
    
    let socketRef: any;

    React.useEffect(() => {
        axios.get('/recent').then(result => { 
            setRecent(result.data)
            socketRef = socketIOclient.connect(
              "http://localhost:8080/"
              );
            socketRef.on("operation", (operations: string[]) => {
              return setRecent(operations);
          })
        }).catch(err => console.log(err))

        return () => {
            socketRef.disconnect();
        }
    }, [])
    
    const sendOp = (operations: string[]) => {
        // POST TO BACKEND HERE, BACKEND EMITS
        axios.post(`/operation`, { operations })
        .then((res) => { return })
        .catch((err) => console.log(err));
        
    }


    return { recentTenOps, sendOp };
}

export default useOps;