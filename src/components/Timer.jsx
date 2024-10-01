import {useState, useEffect} from "react";

export default function Timer({end}) {
    let [timeLeft, setTimeLeft] = useState(end-Date.now());

    useEffect(() => {
        let x = setInterval(() => {
            let diff = end - Date.now();
            setTimeLeft(diff);
        }, 1000);

        return () => {
            clearInterval(x);
        }
    }, [end]);

    return (
        <p>
            {Math.floor((timeLeft+999)/(1000*60))}m {Math.floor((timeLeft+999)%(60*1000)/(1000))}s
        </p>
    );
}