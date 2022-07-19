import logo from "./logo-red-f1.svg"
import { Route, Routes } from "react-router-dom"
import github from "./github.svg"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/Home/Home';
import CurrentSeason from './components/CurrentSeason/CurrentSeason';
import PreviousSeason from "./components/PreviousSeason/PreviousSeason";
import PreviousDriverChampion from "./components/PreviousDriverChampion/PreviousDriverChampion";
import PreviousConstructorChampion from "./components/PreviousConstructorChampion/PreviousConstructorChampion";

function App() {
  return (
    <div className="App">
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
      <main className='main-container'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/2022" element={<CurrentSeason/>} />
          <Route path="/previous-season" element={<PreviousSeason />} />
          <Route path="/drivers-champion" element={<PreviousDriverChampion />} />
          <Route path="/constructors-champion" element={<PreviousConstructorChampion />} />
        </Routes>
      </main>
      <footer>
        {/* <img src="" alt=""></img> */}
        <Navbar bg="light" expand="lg" role='footer' sticky="bottom">
          <Container>
              <Nav className="me-auto">
                <Nav.Link 
                  href="https://github.com/ukakit/formula-one-stats" 
                  target='_blank'
                  rel="noreferrer">
                    <img alt="github-logo" src={github}></img>
                </Nav.Link>
                <Navbar.Text>Disclaimer: This website is for education purposes only</Navbar.Text>
              </Nav>
        </Container>
      </Navbar>
      </footer>
    </div>
  );
}

export default App;
