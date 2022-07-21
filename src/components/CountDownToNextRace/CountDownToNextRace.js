import { useState, useEffect } from "react";
import Countdown from "react-countdown";

const CountDownToNextRace = ( { lastRound}) => {
    const [nextRound, setNextRound] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/current.json")
        .then(res => {
            if (res.status === 502) {
                setError(
					'Server Error, please try again later'
				);
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
    const renderer = ({ days, hours, minutes, seconds }) => {
        return <h3 className='countdown-text'>{`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`}</h3>
    }
    return (
        <>
            {error 
            ?
                <h1>{error}</h1>
            :
                <div className="countdown">
                    {loading && 'Loading results...'}
                    {nextRound && 
                    <>
                    <h2>Countdown to Next Race - {nextRound.raceName}</h2>
                    <Countdown renderer={renderer} date={`${nextRound.date}T${nextRound.time}`} />
                    </>
                    }
                </div>
            }
        </>
    );
};

export default CountDownToNextRace;

