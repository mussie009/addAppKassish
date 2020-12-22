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
      loading: false,
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
      loading: false,
      canEstimate: false,
    });
  }

  selectFile(file) {
    this.resetState();

    this.setState({ loading: true, fileName: file.name });

    readAndParse(file)
      .then((res) => {
        this.setState({
          deliveries: res.deliveries,
          xlsxContent: res.xlsxContent,
          loading: false,
          canEstimate: true,
        });
      })
      .catch((err) => {
        this.setState({
          invalidRows: err,
          loading: false,
        });
      });
  }

  estimate() {
    etaService
      .getEta(this.state.deliveries)
      .then((res) => {
        const output = toOutput(this.state.xlsxContent, res.data);

        writeAndDownload(output, this.state.fileName);
      })
      .catch((error) => {
        this.setState({
          canEstimate: false,
          serverErrors: error.response.data.errors,
        });
      });
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid bg-color-jt mt-4">
          <div className="container">
            <h1 className="display-4 text-white">ETA for Bedriftspakker</h1>
            <p className="lead text-white ">Med fokus på salgsverktøy.</p>
            <FileSelector
              selectFile={this.selectFile}
              fileName={this.state.fileName}
            />
            {this.state.loading && (
              <p className="text-white">Validerer fil...</p>
            )}
            <InvalidRows rows={this.state.invalidRows} />
            {this.state.canEstimate && (
              <EstimateButton estimate={this.estimate} />
            )}
            <ServerErrors errors={this.state.serverErrors} />
          </div>
        </div>
        <XlsxSetup />
      </div>
    );
  }
}

export default ArrivalEstimation;
