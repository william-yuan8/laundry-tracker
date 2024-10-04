import { useRef, useState } from "react";

export default function Machine({id, name, timeLeft, startTimer}) {

    function timebgc() {
        let c = "#AAABBC";
        if (timeLeft <= 0) c = "#5C923A";
        else if (timeLeft <= 10*60) c = "#B80000";
        else if (timeLeft <= 30*60) c = "#FBB02D";
        return c;
    }

    const machineStyle = {
        "background-color": timebgc(),
        "margin": "5px",
    };

    return (
        <span>
            <button type="button" style={machineStyle} onClick={(e) => {
                let l;
                do {
                    l = Number(prompt("how many mins? 0-60"));
                } while (isNaN(l) || l < 0 || l > 60);
                startTimer(name, id, Math.ceil(60*l));
            }}>

                <p>{name}</p>
                <hr/>
                <p>{timeLeft <= 0 ? "Free" : `${Math.floor(timeLeft/60)}m ${Math.ceil(timeLeft%60)}s`}</p>
            </button>
        </span>
    )

}