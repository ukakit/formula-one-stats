import { useState, useEffect } from "react";

const LatestRace = () => {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/current/last/results.json")
        .then(res => {
            // 404 means no results found
			if (res.status === 404) {
				// describe 404 error in error state
				// setError(
					// 'Server Error, please try again later'
				// );
				setLoading(false);
				return;
			} else if (res.status === 200) {
				// 200 means successful response
				// pass body of res onto next .then
				return res.json();
			}})
        .then(data => {
            setResult(data.MRData.RaceTable.Races[0])
            setLoading(false)
        })
        .catch(console.error);

    }, [])
    return (
        <div className="latest-race">
            <h1>Latest Race Result</h1>
            {loading && 'Loading results...'}
            {result &&
                <>
                    <a 
                    href={result.url} 
                    target='_blank'
                    rel="noreferrer"
                    >
                        {result.season} {result.raceName}
                    </a>
                    <ol> 
                        <li className={result.Results[0].Constructor.constructorId}>{`${result.Results[0].Driver.givenName} ${result.Results[0].Driver.familyName}`}</li>
                        <li className={result.Results[1].Constructor.constructorId}>{`${result.Results[1].Driver.givenName} ${result.Results[1].Driver.familyName}`}</li>
                        <li className={result.Results[2].Constructor.constructorId}>{`${result.Results[2].Driver.givenName} ${result.Results[2].Driver.familyName}`}</li>
                    </ol>
                </>
            }
        </div>
    );
};

export default LatestRace;