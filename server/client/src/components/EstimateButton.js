import React from "react";

class EstimateButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.estimateEta();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>
          Beregn
        </button>
      </div>
    );
  }
}

export default EstimateButton;
