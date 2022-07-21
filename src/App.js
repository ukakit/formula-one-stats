import logo from "./logo.svg"
import { Route, Routes } from "react-router-dom"
import "./fonts/Formula1-Regular.ttf"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Fab from '@mui/material/Fab';
import GitHubIcon from '@mui/icons-material/GitHub';

import Home from './components/Home/Home';
import CurrentSeason from './components/CurrentSeason/CurrentSeason';
import PreviousSeason from "./components/PreviousSeason/PreviousSeason";
import PreviousDriverChampion from "./components/PreviousDriverChampion/PreviousDriverChampion";
import PreviousConstructorChampion from "./components/PreviousConstructorChampion/PreviousConstructorChampion";

function App() {
  return (
    <div className="App">
      {/* Nav bar that will stay on top of the page at all times. Made using React Bootstrap*/}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/"><img alt='f1-logo' src={logo}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/2022">2022 Season</Nav.Link>
              <Nav.Link href="/previous-season">Previous Seasons</Nav.Link>
              <Nav.Link href="/drivers-champion">Previous World Drivers' Champion</Nav.Link>
              <Nav.Link href="/constructors-champion">Previous World Constructors' Champion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* container for the contents displayed on various pages throughout the website */}
      <main className='main-container'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/2022" element={<CurrentSeason/>} />
          <Route path="/previous-season" element={<PreviousSeason />} />
          <Route path="/drivers-champion" element={<PreviousDriverChampion />} />
          <Route path="/constructors-champion" element={<PreviousConstructorChampion />} />
        </Routes>
      </main>
      {/* Footer that will remain on each page. Made using MUI Library*/}
      <Navbar bg="light" expand="lg" fixed="bottom" as="footer">
        <Container>
            <Nav className="me-auto">
              <p className='footer-disclaimer'>Disclaimer: This website is for educational purposes only. All Photos and rights relating to them, including copyright and ownership, remain the sole and exclusive property of F1.
              </p>
            </Nav>
        </Container>
      </Navbar>
      <Fab 
        sx={{color:"red" , position: "fixed", right:0, top: "50%"}} 
        aria-label="github" 
        href="https://github.com/ukakit/formula-one-stats" 
        target='_blank'
        rel="noreferrer">
        <GitHubIcon />
      </Fab>
    </div>
  );
}

export default App;
