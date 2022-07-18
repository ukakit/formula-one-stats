import logo from "./logo-red-f1.svg"
import { Link, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/"><img alt='f1-logo' src={logo}></img>Home</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </main>
      <footer>
        {/* <img src="" alt=""></img> */}
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
