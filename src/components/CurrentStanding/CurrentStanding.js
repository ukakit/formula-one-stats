import { useState, useEffect } from "react";
const CurrentStanding = ({ lastRound }) => {
    const [currentStanding, setCurrentStanding] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch("https://ergast.com/api/f1/current/driverStandings.json")
        .then(res => {
            if (res.status === 404) {
				// describe 404 error in error state
				// setError(
					// 'Server Error, please try again later'
				// );
				setLoading(false);
				return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setCurrentStanding(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
            setLoading(false)
        })
        .catch(console.error);
    }, [])
    return (
        <div className='current-standing'>
            {loading && 'Loading results...'}
            {currentStanding && 
                <>
                    <h2>Current Standing as of round {lastRound}</h2>
                    <ol>
                    {currentStanding.map((driver, idx) => {
                        return (
                            <li key = {idx} className={driver.Constructors[0].constructorId}>
                                {driver.points} pts {driver.Driver.givenName} {driver.Driver.familyName} <br></br><img className="driver-img" src={`${process.env.PUBLIC_URL}/assets/22-drivers/${driver.Driver.permanentNumber}.png`} alt=""></img>
                            </li>
                        )})
                    }
                    </ol>
                </>
            }
        </div>
    );
};

export default CurrentStanding;