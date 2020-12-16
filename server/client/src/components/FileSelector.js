import React from 'react';
import supportedTypes from '../utils/supportedTypes';

class FileSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        const files = e.target.files;

        if (files && files[0]) this.props.selectFile(files[0]);
    };

    render() {
        return (
            <div className="mt-5">
                <label for="file-upload" className="custom-button">
                    Velg en fil for å laste opp
                </label>
                <input id="file-upload" type="file" accept={supportedTypes} onChange={this.handleChange} />
            </div>
        )
    }
}

export default FileSelector;