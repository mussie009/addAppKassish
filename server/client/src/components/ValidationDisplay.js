import React from "react";

class ValidationDisplay extends React.Component {

  renderMessage = (validation) => {
    if (validation.type === "headers") {
      return (
        <div className="text-white mt-3">
          <p><i id="warning-icon" className="fa fa-warning mr-3"></i>Mangler nødvendige kolonner:</p>
          <ul>
            {this.props.validation.data.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>
        </div>
      );
    } else if (validation.type === "data") {
      return (
        <div className="text-white mt-3">
          <p><i className="fa fa-warning mr-3"></i>Noen kolonner inneholder ugyldig data:</p>
          <ul>
            {this.props.validation.data.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>
        </div>
      );
    } else return null;
  };

  render() {
    return this.renderMessage(this.props.validation);
  }
}

export default ValidationDisplay;
