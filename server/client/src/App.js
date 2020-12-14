import logo from './logo.svg';
import './App.css';

// Components
import ArrivalEstimation from './components/ArrivalEstimation';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
      <a href="/login">Logg inn med Micosoft konto</a>
        <img src={logo} className="App-logo" alt="logo" />
        
        <ArrivalEstimation />
        
      </header>
    </div>
  );
}

export default App;
