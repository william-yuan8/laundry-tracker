import {useState, useRef, useEffect} from "react";
import Machine from "./Machine";

export default function Dorm(props) {
    let washerList = [], dryerList = [];

    let [washerTimeLeft, setWasherTimeLeft] = useState(Array(props.washers).fill(0));
    let [dryerTimeLeft, setDryerTimeLeft] = useState(Array(props.dryers).fill(0));
    let intervalRef = useRef(null);

    let availW = 0, minWaitW = 60*60;
    for (const i of washerTimeLeft) {
        if (i <= 0) availW++;
        else minWaitW = Math.min(minWaitW, i);
    }

    let availD = 0, minWaitD = 60*60;
    for (const i of dryerTimeLeft) {
        if (i <= 0) availD++;
        else minWaitD = Math.min(i, minWaitD);
    }

    function convert(timeLeft) {
        let secs = Math.ceil(timeLeft%60);
        let mins = Math.floor(timeLeft/60);

        return `${mins}m ${secs}s`;
    }


    function updateTimeLeft(type, id, time) {
        if (type[0] === "W") {
            setWasherTimeLeft(prev => {
                let temp = [...prev];
                for (let i=0; i<temp.length; i++) {
                    if (i === id) {
                        temp[i] = time;
                    }
                }
                return temp;
            });
        } else {
            setDryerTimeLeft(prev => {
                let temp = [...prev];
                for (let i=0; i<temp.length; i++) {
                    if (i === id) {
                        temp[i] = time;
                    }
                }
                return temp;
            });
        }
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            for (let i=0; i<props.washers; i++) {
                updateTimeLeft("W", i, Math.max(0, washerTimeLeft[i]-1));
            }

            for (let i=0; i<props.dryers; i++) {
                updateTimeLeft("D", i, Math.max(0, dryerTimeLeft[i]-1));
            }
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [washerTimeLeft, dryerTimeLeft]);

    for (let i=0; i<props.washers; i++) washerList.push(<Machine key={i} id={i} name={`Washer #${i+1}`} timeLeft={washerTimeLeft[i]} startTimer={updateTimeLeft}/>);
    for (let i=0; i<props.dryers; i++) dryerList.push(<Machine key={i} id={i} name={`Dryer #${i+1}`} timeLeft={dryerTimeLeft[i]} startTimer={updateTimeLeft} />)

    return (
        <>
            <h2>{props.dorm} | Washing machines: {props.washers} ({availW > 0 ? `${availW} available` : `Next free in: ${convert(minWaitW)}`}) 
                             | Dryers: {props.dryers} ({availD > 0 ? `${availD} available` : `Next free in: ${convert(minWaitD)}`})</h2>
            <div>
                {washerList}
            </div>
            <hr></hr>
            <div>
                {dryerList}
            </div>
        </>
    )
}