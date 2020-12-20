import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';


// Components
import ArrivalEstimation from './components/ArrivalEstimation';

const App = () => {

  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
        const response = await axios.get('/api/current_user');
        setUser(response.data)
    } catch (e) {
        console.log("Error in fetching the user...: ", e);
    }
  };

  useEffect(() => {   
    fetchUser();
  }, []);

  return (
    <div className="container-fluid">
      <Header user={user}/>
      <ArrivalEstimation />
    </div>
  );
}

export default App;
