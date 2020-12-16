import React from 'react';
import EstimateButton from './EstimateButton';
import FileSelector from './FileSelector';
import etaService from '../services/eta.service';
import { parseWorkbook, generateWorkbook } from '../utils/xlsxHelper';

class ArrivalEstimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '',
      input: []
    };

    this.selectFile = this.selectFile.bind(this);
    this.estimate = this.estimate.bind(this);
  }

  selectFile(file) {
    this.setState({ fileName: file.name });

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      // Parse data
      const bstr = e.target.result;
      const data = parseWorkbook(bstr, rABS ? "binary" : "array");

      // Update state
      this.setState({ input: data });
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  estimate() {
    etaService.getEta(this.state.input).then((response) => {
      // Download new workbook with estimates
      generateWorkbook(response.data, this.state.fileName);
    }).catch((error) => {
      console.error(error);
    });
  };

  render() {
    return (
      <div>
        <FileSelector selectFile={this.selectFile} />
        <EstimateButton estimate={this.estimate} />
      </div>
    );
  }
}

export default ArrivalEstimation;
