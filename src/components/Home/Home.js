import { useState, useEffect } from "react";
import CountDownToNextRace from "../CountDownToNextRace/CountDownToNextRace";
import CurrentStanding from "../CurrentStanding/CurrentStanding";
import LatestRace from "../LatestRace/LatestRace";

const Home = () => {
    // saves result from latest race as state to be passed down to Latest component to render latest race
    const [result, setResult] = useState(null)
    // saves the lastest round number as state to be passed down to CountDownToNextRace component
    const [lastRound, setLastRound] = useState(null)
    const [latestLoading, setLatestLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=> {
        setLatestLoading(true)
        fetch("https://ergast.com/api/f1/current/last/results.json")
        .then(res => {
			if (res.status === 502) {
				setError(
					'Server Error, please try again later'
				);
				setLatestLoading(false);
				return;
			} else if (res.status === 200) {
				return res.json();
			}})
        .then(data => {
            setResult(data.MRData.RaceTable.Races[0])
            setLastRound(parseInt(data.MRData.RaceTable.Races[0].round))
            setLatestLoading(false)
        })
        .catch(console.error);

    }, [])
    return (
        <>
            <h1 className='welcome-msg'>Welcome to F1 Stats</h1>
            {/* checks to se if there is an error in getting data from API, if so, renders error message */}
            {error ?

            <h1>{error}</h1>

            :
            // else, continues to render the 3 components on the screen
            <>
            <CountDownToNextRace lastRound={lastRound}/>
            <CurrentStanding />
            <LatestRace result={result} latestLoading={latestLoading}/>
            </>
            }
        </>
    );
};

export default Home;