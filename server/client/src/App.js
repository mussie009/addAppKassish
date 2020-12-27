import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';
import ArrivalEstimation from './components/ArrivalEstimation';

const App = () => {

  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
        const response = await axios.get('/api/current_user');
        setUser(response.data || false)
    } catch (e) {
        console.log("Error in fetching the user...: ", e);
    }
  };

  useEffect(() => {   
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Header user={user}/>
        <Route path='/' exact={true} component={Landing}/>
        <Route path='/estimer' component={ArrivalEstimation}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
