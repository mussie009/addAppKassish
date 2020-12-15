import React from "react";

class EstimateButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.estimate();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>
          Estimer
        </button>
      </div>
    );
  }
}

export default EstimateButton;
