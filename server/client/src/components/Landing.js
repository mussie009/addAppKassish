import React from 'react';

const Landing = () => {
    return (
        <div>
          <div className="jumbotron jumbotron-fluid bg-color-jt mt-4">
            <div className="container">
              <h1 className="display-4 text-white">ETA for Bedriftspakker</h1>
              <p className="lead text-white ">Med fokus på salgsverktøy.</p>
              <p className="lead text-white mt-5">Logg inn for å få tilgang til ETA tjenesten</p>
              <a className="custom-button" href="/auth/openid">Logg inn</a>
            </div>
          </div>
        </div>
      );
}

export default Landing;