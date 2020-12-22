import React from "react";
import "../App.css";
import FileSelector from "./FileSelector";
import InvalidRows from "./InvalidRows";
import EstimateButton from "./EstimateButton";
import ServerErrors from "./ServerErrors";
import XlsxSetup from "./XlsxSetup";
import etaService from "../services/eta.service";
import { readAndParse, writeAndDownload } from "../utils/xlsxHelper";
import { toOutput } from "../utils/converter";

class ArrivalEstimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      deliveries: [],
      xlsxContent: [],
      invalidRows: [],
      serverErrors: [],
      validating: false,
      estimating: false,
      canEstimate: false,
    };

    this.selectFile = this.selectFile.bind(this);
    this.estimate = this.estimate.bind(this);
  }

  resetState() {
    this.setState({
      deliveries: [],
      xlsxContent: [],
      invalidRows: [],
      serverErrors: [],
      validating: false,
      estimating: false,
      canEstimate: false,
    });
  }

  selectFile(file) {
    this.resetState();

    this.setState({ validating: true, fileName: file.name });

    readAndParse(file)
      .then((res) => {
        this.setState({
          deliveries: res.deliveries,
          xlsxContent: res.xlsxContent,
          validating: false,
          canEstimate: true,
        });
      })
      .catch((err) => {
        this.setState({
          invalidRows: err,
          validating: false,
        });
      });
  }

  estimate() {
    this.setState({ estimating: true });

    etaService
      .getEta(this.state.deliveries)
      .then((res) => {
        const output = toOutput(this.state.xlsxContent, res.data);

        writeAndDownload(output, this.state.fileName);

        this.setState({ estimating: false });
      })
      .catch((error) => {
        this.setState({
          estimating: false,
          canEstimate: false,
          serverErrors: error.response.data.errors,
        });
      });
  }

  feedback() {
    if (this.state.validating) {
      return (
        <p className="text-white">
          <i id="warning-icon" className="fa fa-spinner fa-pulse m-2"></i>
          Validerer...
        </p>
      );
    } else if (this.state.canEstimate) {
      return (
        <p className="text-white">
          <i id="valid-icon" className="fa fa-check m-2"></i>
          Gyldig
        </p>
      );
    } else return null;
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid bg-color-jt mt-4">
          <div className="container">
            <h1 className="display-4 text-white">ETA for Bedriftspakker</h1>
            <p className="lead text-white">Med fokus på salgsverktøy.</p>
            <FileSelector
              selectFile={this.selectFile}
              fileName={this.state.fileName}
            />
            {this.feedback()}
            <InvalidRows rows={this.state.invalidRows} />
            <ServerErrors errors={this.state.serverErrors} />
            {this.state.estimating && (
              <p className="text-white">
                <i id="warning-icon" className="fa fa-spinner fa-pulse m-2"></i>
                Laster ned...
              </p>
            )}
            {this.state.canEstimate && !this.state.estimating && (
              <EstimateButton estimate={this.estimate} />
            )}
          </div>
        </div>
        <XlsxSetup />
      </div>
    );
  }
}

export default ArrivalEstimation;
