import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

const DriverChampionResultDetail = ({season}) => {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [seasonState, setSeasonState] = useState(season)
    useEffect( () => {
        setLoading(true);
        fetch(`https://ergast.com/api/f1/${seasonState}/driverStandings.json`)
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
            setDetail(data.MRData.StandingsTable.StandingsLists[0])
            setLoading(false)
        })
        .catch(console.error);
    }, [seasonState])
    const handlePreviousSeason = () => {
        if (seasonState > 1950) {
            setSeasonState(prev => prev -= 1)
        }
    }
    const handleNextSeason = () => {
        if (seasonState < 2021) {
            setSeasonState(prev => prev += 1)
        }
    }
    return (
        <div className="query-result">
            {loading && 'Loading results...'}
            {detail &&
                <>
                    <div className='table-nav'>
                        <Button variant='outline-primary' onClick={handlePreviousSeason}>{"<"}</Button>
                        <h1>{detail.season}</h1>
                        <Button variant='outline-primary' onClick={handleNextSeason}>{">"}</Button>
                    </div>
                    <Table striped bordered hover responsive variant='light'>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Driver</th>
                                <th>Constructor</th>
                                <th>End of Season Points</th>
                                <th>Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.DriverStandings.map((result, idx) => {
                                return(
                                    <tr key={idx}>
                                        <td>{result.position}</td>
                                        <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                        <td>{result.Constructors[0].name}</td>
                                        <td>{result.points}</td>
                                        <td>{result.wins}</td>
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

export default DriverChampionResultDetail;
