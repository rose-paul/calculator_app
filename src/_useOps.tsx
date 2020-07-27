import * as React from "react";
import * as socketIOclient from "socket.io-client";
import axios from 'axios';

const useOps = () : any => {
    const [recentTenOps, setRecent] = React.useState([]);

    let socketRef: any;

    React.useEffect(() => {
        axios.get('/recent').then(result => setRecent(result.data)).catch(err => console.log(err))
        socketRef = socketIOclient.connect(
          "http://localhost:8080/"
          );
        
          socketRef.on("operation", (operation: string) => {
            console.log(`Incoming processed: ${operation}`)
            console.log(`Current display state: ${recentTenOps}`)
            const newOps = recentTenOps.length >= 10 ? [...recentTenOps.slice(0, recentTenOps.length - 1), operation] : [...recentTenOps, operation]
            console.log(`New state: ${newOps}`)
            return setRecent(newOps);
        })
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