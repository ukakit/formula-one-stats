import Table from 'react-bootstrap/Table';

const LatestRace = ({ result, latestLoading }) => {
    return (
        <div className="latest-race">
            <h2>Latest Race Result</h2>
            {latestLoading && 'Loading results...'}
            {result &&
                <>
                    <a 
                    href={result.url} 
                    target='_blank'
                    rel="noreferrer"
                    >
                        {result.season} {result.raceName}
                    </a>
                    <Table bordered hover className="latest-race-table" variant='light'>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.Results.map((position, idx) => {
                                return (
                                <tr key = {idx}>
                                    <td>{position.position}</td>
                                    <td>{`${position.Driver.givenName} ${position.Driver.familyName}`}</td>
                                    <td>{position.points}</td>
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

export default LatestRace;