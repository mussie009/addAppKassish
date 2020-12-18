import React from "react";

class ValidationDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMessage = (validation) => {
    if (validation.type === "headers") {
      return (
        <div className="text-white">
          <p>Mangler nødvendige kolonner:</p>
          <ul>
            {this.props.validation.data.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>
        </div>
      );
    } else if (validation.type === "data") {
      return (
        <div className="text-white">
          <p>Noen kolonner inneholder ugyldig data:</p>
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
