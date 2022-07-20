import { useState, useEffect } from "react";
import RaceResultDetail from '../RaceResultDetail/RaceResultDetail';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CurrentSeason = () => {
    const [dropdownValue, setDropdownValue] = useState("")
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalRounds, setTotalRounds] = useState(0);
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/current.json")
        .then(res => {
            if (res.status === 404) {
                setLoading(false)
                return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setSchedule(data.MRData.RaceTable.Races)
            setTotalRounds(data.MRData.RaceTable.Races.length)
            setLoading(false)
        })
        .catch(console.error);
    
    }, [])
    const handleSelect = (e) => {
        setDropdownValue(e)
    }
    return (
        <>
            {loading && 
                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </>
            }
            {/* React BootStrap nav bar */}       
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand>2022 Season Race Results Inquiry</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {schedule && 
                                <NavDropdown title="Round" id="nav-dropdown" onSelect={handleSelect}>
                                {schedule.map((race , idx) => {
                                    return <NavDropdown.Item key={idx} eventKey={race.round}>{race.raceName}</NavDropdown.Item>
                                })}
                            </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {dropdownValue ?
            <RaceResultDetail season={2022} round={parseInt(dropdownValue)} totalRounds={totalRounds} />
            :
            <h1>Select A Race From the Dropdown to See Race Results</h1>}
        </>
      );
};


export default CurrentSeason;