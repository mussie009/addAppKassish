import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom';

import Landing from './components/Landing';

const App = () => {

return (
<Router>
  <div>
  <ul>
    <li>
      <Link to="/">Landing</Link>
    </li>
  </ul>
  <hr />
    <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
     </div> 
  </Router>
  );
}

export default App;
