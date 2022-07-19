import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const ConstructorChampionResultDetail = ({season}) => {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect( () => {
        setLoading(true);
        fetch(`https://ergast.com/api/f1/${season}/constructorStandings.json`)
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
    }, [season])
    return (
        <div className="query-result">
            {loading && 'Loading results...'}
            {detail &&
                <>
                    <h1>{detail.season}</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Constructor</th>
                                <th>Nationality</th>
                                <th>End of Season Points</th>
                                <th>Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.ConstructorStandings.map((constructor, idx) => {
                                return(
                                    <tr key={idx}>
                                        <td>{constructor.position}</td>
                                        <td>{constructor.Constructor.name}</td>
                                        <td>{constructor.Constructor.nationality}</td>
                                        <td>{constructor.points}</td>
                                        <td>{constructor.wins}</td>
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

export default ConstructorChampionResultDetail;
