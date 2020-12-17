import React from "react";
import "../App.css";
import EstimateButton from "./EstimateButton";
import FileSelector from "./FileSelector";
import etaService from "../services/eta.service";
import { readAndParse, writeAndDownload } from "../utils/xlsxHelper";
import { toInput, toOutput } from "../utils/mapData";

class ArrivalEstimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      headers: [],
      data: [],
      canEstimate: false,
    };

    this.selectFile = this.selectFile.bind(this);
    this.estimate = this.estimate.bind(this);
  }

  selectFile(file) {
    this.setState({ fileName: file.name });

    readAndParse(file)
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
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
          <EstimateButton
            canEstimate={this.state.canEstimate}
            estimate={this.estimate}
          />
        </div>
      </div>
    );
  }
}

export default ArrivalEstimation;
