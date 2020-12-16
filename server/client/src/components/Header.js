import React from 'react';
import bringLogo from '../bringLogo.png'

const Header = (props) => {

    const renderContent = () => {
        switch (props.auth) {
          case null:
            return;
          case false:
            return (<a className="nav-link ml-auto App-link"href="/login">Logg inn<i className="fa fa-user ml-3"></i></a>);
          default:
            return (<a className="nav-link ml-auto App-link" href="/api/logout">Logg ut<i className="fa fa-user ml-3"></i></a>);
    
        }
    }
    return(
        <nav className="nav m-4">
            <img src={bringLogo}/>  
            {renderContent()}
        </nav>
    );
}

export default Header;