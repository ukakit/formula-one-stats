import { useState, useEffect } from "react";
import ConstructorChampionResultDetail from "../ConstructorChampionResultDetail/ConstructorChampionResultDetail";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const PreviousConstructorChampion = () => {
    const [seasonsDropdownValue, setSeasonsDropdownValue] = useState(2021)
    const [season, setSeason] = useState(null);
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
            
    const handleSeasonSelect = (e) => {
        setSeasonsDropdownValue(parseInt(e))
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
                    <Navbar.Brand>Previous World Constructors' Champion Inquiry</Navbar.Brand>
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {seasonsDropdownValue ?
                <ConstructorChampionResultDetail season={seasonsDropdownValue}/>
            :
                <h1>Select A Season From the Dropdown to See Champion Result</h1>
            }
        </div>
      );
};

export default PreviousConstructorChampion;