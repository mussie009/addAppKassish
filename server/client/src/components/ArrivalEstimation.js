import React from "react";
import XLSX from "xlsx";
import EstimateButton from "./EstimateButton";
import FileSelector from "./FileSelector";
import etaService from '../services/eta.service';

class ArrivalEstimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.selectFile = this.selectFile.bind(this);
    this.estimateEta = this.estimateEta.bind(this);
  }

  selectFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      // Parse data
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      // Get the first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // Convert to JSON and map to valid property name
      const data = XLSX.utils.sheet_to_json(ws).map((record) => {
        return {
          to_postal_code: record["Sendt til postnummer"],
          from_postal_code: record["Sendt fra postnummer"],
          send_date: new Date().toISOString().slice(0, 10),
        };
      });

      // Update state
      this.setState({ data: data });

      console.log(this.state.data); // Test
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  estimateEta() {
    etaService.getEta(this.state.data).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
  };

  render() {
    return (
      <div>
        <FileSelector selectFile={this.selectFile} />
        <EstimateButton estimateEta={this.estimateEta} />
      </div>
    );
  }
}

export default ArrivalEstimation;
