import React from 'react';

class ServerErrorDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props)
        return (
            <div className="text-white">
                <p>Server responderte med følgende feilmelding: </p>
            </div>
        );
    }
}
export default ServerErrorDisplay;