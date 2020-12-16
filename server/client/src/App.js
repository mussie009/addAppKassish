import logo from './logo.svg';
import './App.css';
import Header from './components/Header'

// Components
import ArrivalEstimation from './components/ArrivalEstimation';

const App = () => {
  return (
    <div className="container-fluid">
      <Header/>
        <ArrivalEstimation />
    </div>
  );
}

export default App;
