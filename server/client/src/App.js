import logo from './logo.svg';
import './App.css';

// Components
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
      <a href="/login">Logg inn med Micosoft konto</a>
        <img src={logo} className="App-logo" alt="logo" />
        
        <FileUpload />
        
      </header>
    </div>
  );
}

export default App;
