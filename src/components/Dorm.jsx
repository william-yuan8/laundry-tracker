import {useState, useRef, useEffect} from "react";
import Machine from "./Machine";

export default function Dorm(props) {
    let washerList = [], dryerList = [];

    let [washerTimeLeft, setWasherTimeLeft] = useState(Array(props.washers).fill(0));
    let [dryerTimeLeft, setDryerTimeLeft] = useState(Array(props.dryers).fill(0));
    let intervalRef = useRef(null);
    let availW = 0;
    for (const i of washerTimeLeft) {
        if (i <= 0) availW++;
    }

    let availD = 0;
    for (const i of dryerTimeLeft) {
        if (i <= 0) availD++;
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
            <h2>{props.dorm} | Washing machines: {props.washers} ({availW} available) | Dryers: {props.dryers} ({availD} available)</h2>
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