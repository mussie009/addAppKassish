import React from "react";

class ServerErrorDisplay extends React.Component {

  renderMessage() {
    if (this.props.error.status === 400) {
        return (
            <div className="text-white">
                <p>Serveren svarte med følgende feilmelding:</p>
                {this.props.error.data.errors.map((value, index) => {
                    return <p key={index}>{value}</p>
                })}
            </div>
        )
    } else return null;
  }

  render() {
    return this.renderMessage();
  }
}
export default ServerErrorDisplay;
