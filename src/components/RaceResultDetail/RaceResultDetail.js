import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const RaceResultDetail = ({season, round}) => {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // API call to get the result of a specific race in a season, based on the round number
    useEffect( () => {
        setLoading(true);
        fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`)
        .then(res => {
            if (res.status === 404) {
				setError(
					'Server Error, please try again later'
				);
				setLoading(false);
				return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setDetail(data.MRData.RaceTable.Races[0])
            setLoading(false)
        })
        .catch(console.error);
    }, [season, round])
    return (
        <div className="query-result">
            {loading && 'Loading results...'}
            {error ?
            <h1>{error}</h1>
            :
            // renders a table from React Bootstrap library if there is details from the API call, else, shows message of No Data
            <>
            {detail ?
                <>
                    <h1>{detail.season} {detail.raceName}</h1>
                    <h2>{detail.Circuit.circuitName} - {detail.date}</h2>
                    <Table striped bordered hover responsive variant="light">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Starting Grid</th>
                                <th>No</th>
                                <th>Driver</th>
                                <th>Constructor</th>
                                <th>Laps</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Points Gained</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.Results.map((result, idx) => {
                                return(
                                    <tr key={idx}>
                                        <td>{result.position}</td>
                                        <td>{result.grid}</td>
                                        <td>{result.number}</td>
                                        <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                        <td>{result.Constructor.name}</td>
                                        <td>{result.laps}</td>
                                        <td>{result.Time ? result.Time.time : ""}</td>
                                        <td>{result.status}</td>
                                        <td>{result.points}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </>
                :
                <h1>No Data</h1>
                }
            </>
            }
        </div>
    );
};

export default RaceResultDetail;