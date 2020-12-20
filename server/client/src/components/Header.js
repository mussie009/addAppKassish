import React from 'react';
import bringLogo from '../bringLogo.png'

const Header = ({ user }) => {

    const renderContent = () => {
          if(!user){
            return (<a className="nav-link ml-auto App-link"href="/auth/openid">Logg inn<i className="fa fa-user ml-3"></i></a>);
          } else {
            return (<a className="nav-link ml-auto App-link" href="/api/logout">Logg ut<i className="fa fa-user ml-3"></i></a>);
          }
    };

    return(
        <nav className="nav m-4">
            <img src={bringLogo} alt="Bring logo"/>  
            {renderContent()}
        </nav>
    );
}

export default Header;