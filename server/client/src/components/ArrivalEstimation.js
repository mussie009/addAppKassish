import React from "react";
import "../App.css";
import EstimateButton from "./EstimateButton";
import FileSelector from "./FileSelector";
import ValidationDisplay from "./ValidationDisplay";
import etaService from "../services/eta.service";
import { readAndParse, writeAndDownload } from "../utils/xlsxHelper";
import { toInput, toOutput } from "../utils/converter";
import Instructions from "./Instructions";
import ServerErrorDisplay from "./ServerErrorDisplay";

class ArrivalEstimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      shippings: [],
      xlsxContent: [],
      validation: {},
      serverError: {},
      loading: false,
      canEstimate: false,
    };

    this.selectFile = this.selectFile.bind(this);
    this.estimate = this.estimate.bind(this);
  }

  resetState() {
    this.setState({
      shippings: [],
      xlsxContent: [],
      validation: {},
      serverError: {},
      canEstimate: false,
    });
  }

  selectFile(file) {
    this.resetState();
    this.setState({ loading: true, fileName: file.name });

    readAndParse(file)
      .then((res) => {
        this.setState({
          shippings: res.shippings,
          xlsxContent: res.content,
          canEstimate: true,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({ validation: err, loading: false });
      });
  }

  estimate() {

    etaService
      .getEta(this.state.shippings)
      .then((res) => {
        const output = toOutput(this.state.xlsxContent, res.data);

        writeAndDownload(output, this.state.fileName);
      })
      .catch((error) => {
        this.setState({
          canEstimate: false,
          serverError: {
            status: error.response.status,
            data: error.response.data,
          },
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
            <FileSelector selectFile={this.selectFile} fileName={this.state.fileName}/>
            {this.state.loading && (
              <p className="text-white">Validerer fil...</p>
            )}
            <ValidationDisplay
              fileName={this.state.fileName}
              validation={this.state.validation}
            />
            {this.state.canEstimate && (
              <EstimateButton estimate={this.estimate} />
            )}
            <ServerErrorDisplay error={this.state.serverError}/>
          </div>
        </div>
        <Instructions/>
      </div>
    );
  }
}

export default ArrivalEstimation;
