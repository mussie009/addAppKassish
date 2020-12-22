import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';



// Components
import ArrivalEstimation from './components/ArrivalEstimation';
import { isValidObjectId } from 'mongoose';
const LandingComponent = () => <h2>Landing component</h2>
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
    <BrowserRouter>
      <div className="container-fluid">
        <Header user={user}/>
        <Route path='/' exact={true} component={Landing}/>
        <Route path='/estimer' exact={true} component={ArrivalEstimation}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
