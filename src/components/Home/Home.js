import { useState, useEffect } from "react";
import CountDownToNextRace from "../CountDownToNextRace/CountDownToNextRace";
import CurrentStanding from "../CurrentStanding/CurrentStanding";
import LatestRace from "../LatestRace/LatestRace";

const Home = () => {
    const [result, setResult] = useState(null)
    const [lastRound, setLastRound] = useState(null)
    const [latestLoading, setLatestLoading] = useState(false);
    useEffect(()=> {
        setLatestLoading(true)
        fetch("https://ergast.com/api/f1/current/last/results.json")
        .then(res => {
			if (res.status === 404) {
				// describe 404 error in error state
				// setError(
					// 'Server Error, please try again later'
				// );
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
            <CountDownToNextRace lastRound={lastRound}/>
            <CurrentStanding />
            <LatestRace result={result} latestLoading={latestLoading}/>
        </>
    );
};

export default Home;