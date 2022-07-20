import { useState, useEffect } from "react";
import RaceResultDetail from '../RaceResultDetail/RaceResultDetail';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const PreviousSeason = () => {
    const [seasonsDropdownValue, setSeasonsDropdownValue] = useState(2021)
    const [racesDropdownValue, setRacesDropdownValue] = useState(1)
    const [season, setSeason] = useState(null);
    const [races, setRaces] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true)
        fetch("https://ergast.com/api/f1/seasons.json?limit=200")
        .then(res => {
            if (res.status === 404) {
                setLoading(false)
                return;
            } else if (res.status === 200) {
                return res.json();
            }})
        .then(data => {
            setSeason(data.MRData.SeasonTable.Seasons.reverse().filter(season => season.season !== "2022"))
            setLoading(false)
        })
        .catch(console.error);
    
    }, [])
    useEffect(()=> {
            fetch(`https://ergast.com/api/f1/${seasonsDropdownValue}.json`)
            .then(res => {
                if (res.status === 404) {
                    return;
                } else if (res.status === 200) {
                    return res.json();
                }})
                .then(data => {
                    setRaces(data.MRData.RaceTable.Races)
                })
                .catch(console.error);
        }, [seasonsDropdownValue])
            
    const handleSeasonSelect = (e) => {
        setSeasonsDropdownValue(e)
    }
    const handleRaceSelect = (e) => {
        setRacesDropdownValue(e)
    }

    return (
        <div className="previous-season">
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
                    <Navbar.Brand>Previous Season Race Results Inquiry</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {season && 
                                <NavDropdown 
                                id="nav-dropdown"
                                title="Season"
                                onSelect={handleSeasonSelect}
                                >
                                    {season.map((season , idx) => {
                                        return <NavDropdown.Item key={idx} eventKey={season.season}>{season.season}</NavDropdown.Item>
                                    })}
                                </NavDropdown>
                            }
                            {races && 
                                <NavDropdown 
                                id="nav-dropdown" 
                                title="Round"
                                onSelect={handleRaceSelect}
                                >
                                    {races.map((race , idx) => {
                                        return <NavDropdown.Item key={idx} eventKey={race.round}>{race.raceName}</NavDropdown.Item>
                                    })}
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {seasonsDropdownValue &&
                <RaceResultDetail season={seasonsDropdownValue} round={racesDropdownValue} />
            }
        </div>
      );
};

export default PreviousSeason;