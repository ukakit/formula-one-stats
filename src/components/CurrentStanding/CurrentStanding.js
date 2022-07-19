import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const CurrentStanding = () => {
    const [currentStanding, setCurrentStanding] = useState(null);
    const [lastRound, setLastRound] = useState(null)
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
            setLastRound(data.MRData.StandingsTable.StandingsLists[0].round)
            setLoading(false)
        })
        .catch(console.error);
    }, [])
    return (
        <div className='current-standing'>
            {loading && 'Loading results...'}
            {currentStanding && 
                <>
                    <h2>Current Drivers' Standing as of Round {lastRound}</h2>
                    <Row sm={3} md={4} lg={5}>
                    {currentStanding.map((driver, idx) => {
                        return (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/22-drivers/${driver.Driver.permanentNumber}.png`}/>
                                    <Card.Body>
                                        <Card.Title>{driver.position}. {driver.Driver.givenName} {driver.Driver.familyName}</Card.Title>
                                        <Card.Text>
                                            {driver.points} pts
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )})}
                    </Row>
                </>
            }
        </div>
    );
};

export default CurrentStanding;