import React from "react";
import "../App.css";
import EstimateButton from "./EstimateButton";
import FileSelector from "./FileSelector";
import ValidationDisplay from "./ValidationDisplay";
import etaService from "../services/eta.service";
import { readAndParse, writeAndDownload } from "../utils/xlsxHelper";
import { toInput, toOutput } from "../utils/converter";

class ArrivalEstimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      data: [],
      validation: {},
      loading: false,
      canEstimate: false,
    };

    this.selectFile = this.selectFile.bind(this);
    this.estimate = this.estimate.bind(this);
  }

  resetState() {
    this.setState({
      data: [],
      validation: {},
      canEstimate: false
    });
  }

  selectFile(file) {
    this.resetState();
    this.setState({ loading: true, fileName: file.name });

    readAndParse(file)
      .then((res) => {
        this.setState({ data: res, canEstimate: true, loading: false });
        console.log("Data", this.state.data);
      })
      .catch((err) => {
        this.setState({ validation: err, loading: false });

        console.log("Errors", this.state.validation);
      });
  }

  estimate() {
    const input = toInput(this.state.data);

    etaService
      .getEta(input)
      .then((response) => {
        const output = toOutput(this.state.data, response.data);

        writeAndDownload(output, this.state.fileName);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-color-jt mt-4">
        <div className="container">
          <h1 className="display-4 text-white">ETA for Bedriftspakker</h1>
          <p className="lead text-white ">Med fokus på salgsverktøy.</p>
          <FileSelector selectFile={this.selectFile} />
          {this.state.loading && <p className="text-white">Validerer {this.state.fileName}...</p>}
          <ValidationDisplay fileName={this.state.fileName} validation={this.state.validation} />
          {this.state.loading && <p>Validerer fil...</p>}
          {this.state.canEstimate && <EstimateButton estimate={this.estimate} />}
        </div>
      </div>
    );
  }
}

export default ArrivalEstimation;
