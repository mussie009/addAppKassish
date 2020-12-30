import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';
import ArrivalEstimation from './components/ArrivalEstimation';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    try {
        const response = await axios.get('/api/current_user');
        setIsAuthenticated(response.data || false)
        
    } catch (e) {
        console.log("Error in fetching the user...: ", e);
    }
  };

  useEffect(() => {   
    fetchUser();
  }, []);

  //console.log("Is user authenticated:", isAuthenticated)
  
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated}/>
        <Switch>
          <UnauthenticatedRoute
            path="/"
            exact={true}
            component={Landing}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/estimer"
            exact={true}
            component={ArrivalEstimation}
            appProps={{ isAuthenticated }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
