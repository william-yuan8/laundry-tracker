import {useState, useEffect} from "react";

 

function Machine({children, name}) {
    let [end, setEnd] = useState(Date.now());
    let [timeLeft, setTimeLeft] = useState(end-Date.now());
    let [free, setFree] = useState(true);

    // timer
    useEffect(() => {
        let x = setInterval(() => {
            let diff = end - Date.now();
            if (diff <= 0) {
                setTimeLeft(diff);
                return () => {
                    clearInterval(x);
                }
            }
            setTimeLeft(diff);
        }, 200);

        return () => {
            clearInterval(x);
        }
    }, [end]);

    function timeBGC() {
        let c = "gray";
        let mins = timeLeft/(60*1000);
        if (mins <= 0) c = "green";
        else if (mins < 10) c = "red";
        else if (mins < 30) c = "yellow";
        return c;
    } 

    const machineStyle = {
        backgroundColor: timeBGC(),
        margin: "5px",
        color: "black",
    };

    return (
        <span>
            <button type="button" style={machineStyle} onClick={(e) => {
                let l = Number(prompt("how many minutes", 10))*1000*60;
                setEnd(Date.now()+l);
            }}>
                {name}
                <hr/>
                <p>{timeLeft <= 0 ? "Free" : `${Math.floor((timeLeft+999)/(1000*60))}m ${Math.floor((timeLeft+999)%(60*1000)/(1000))}s`}</p>
            </button>
        </span>
    );
}

export default function Dorm(props) {
    let washerList = [], dryerList = [];

    for (let i=0; i<props.washers; i++) washerList.push(<Machine key={i} name={`Washer #${i+1}`} />);
    for (let i=0; i<props.dryers; i++) dryerList.push(<Machine key={i} name={`Dryer #${i+1}`} />)

    return (
        <>
            <h2>{props.dorm} | Washing machines: {props.washers} | Dryers: {props.dryers}</h2>
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