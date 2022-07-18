import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const RaceResultDetail = ({season, round}) => {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect( () => {
        setLoading(true);
        fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`)
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
            setDetail(data.MRData.RaceTable.Races[0])
            setLoading(false)
        })
        .catch(console.error);
    }, [season, round])
    return (
        <div>
            {loading && 'Loading results...'}
            {detail &&
                <>
                    <h1>{detail.season} {detail.raceName}</h1>
                    <Table striped bordered hover>
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
            }
        </div>
    );
};

export default RaceResultDetail;