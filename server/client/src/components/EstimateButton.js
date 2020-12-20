import React from "react";
import '../App.css';

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
      <div className="mt-4">
        <a className="custom-button" onClick={this.handleOnClick}>
        <i className="fa fa-download mr-3"></i>
          Lastned
        </a>
      </div>
    );
  }
}

export default EstimateButton;
