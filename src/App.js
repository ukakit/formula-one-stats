// import './App.css';
import { Link, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">(ICON) Home</Link>
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
