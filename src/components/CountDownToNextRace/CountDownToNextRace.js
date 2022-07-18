import { useState, useEffect } from "react";
import Countdown from "react-countdown";

const CountDownToNextRace = ( { lastRound}) => {
    const [nextRound, setNextRound] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/current.json")
        .then(res => {
            if (res.status === 404) {
                setLoading(false)
                return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setNextRound(data.MRData.RaceTable.Races[lastRound])
            setLoading(false)
        })
        .catch(console.error);
    
    }, [lastRound])
    
    return (
        <div className="countdown">
            {loading && 'Loading results...'}
            {nextRound && 
            <>
            <h2>Countdown to Next Race - {nextRound.raceName}</h2>
            <Countdown date={`${nextRound.date}T${nextRound.time}`} />
            </>
            }
        </div>
    );
};

export default CountDownToNextRace;

