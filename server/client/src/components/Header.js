import React from 'react';
import { Link } from 'react-router-dom';
import bringLogo from '../bringLogo.png'

const Header = ({ user }) => {

    const renderContent = () => {
          switch(user){
            case null:
              return;
            case false:
              return (<a className="nav-link ml-auto App-link "href="/auth/openid">Logg inn<i className="fa fa-user ml-3"></i></a>);
            default:
              return (<a className="nav-link ml-auto App-link" href="/api/logout">Logg ut<i className="fa fa-user ml-3"></i></a>);
          }
    };

    return(
        <nav className="nav m-4">
            <Link to={user ? '/estimer': '/'}><img src={bringLogo} alt="Bring logo"/></Link> 
            {renderContent()}
        </nav>
    );
}

export default Header;