import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Index from './Components/Index';
import Play2 from './Components/Play2';

function App() {
  return (
    <Router>
      <header>Go Fish 🎣</header>
      <main>
        <Route exact path="/" component={Index} />
        <Route exact path="/play" component={Play2} />
      </main>
      <footer>
        <div>
          Made by <a href="https://www.shaunms.com">Shaun S</a> with help from the <a href="https://deckofcardsapi.com/">Deck of Cards API</a> - 2021
        </div>
      </footer>
    </Router>
  );
}

export default App;
