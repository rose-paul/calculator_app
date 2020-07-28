import * as React from "react";
import * as socketIOclient from "socket.io-client";
import axios from 'axios';

const useOps = () : any => {
    const [recentTenOps, setRecent] = React.useState([]);
    let socketRef: any;

    React.useEffect(() => {
        axios.get('/recent').then(result => { 
            setRecent(result.data)
            socketRef = socketIOclient.connect(
              "http://localhost:8080/"
              );
            socketRef.on("operation", (operations: string[]) => {
            //   const newOps = [...recentTenOps.slice(0, recentTenOps.length - 1), operation];
            console.log(operations)
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
        .then((res) => { console.log('success')})
        .catch((err) => console.log(err));
        
    }


    return { recentTenOps, sendOp };
}

export default useOps;