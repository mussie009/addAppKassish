import React from "react";

const XlsxSetup = (props) => {

  const layout = {
    title: "Oppsett",
    guidelines: [
      `Første kolonne må inneholde postnummer for hvor pakken er sendt fra`,
      `Andre kolonne må inneholde postnummer for hvor pakken er sendt til`
    ],
  };

  return (
    <div className="m-4">
      <h1>{layout.title}</h1>
      <ul>
        {layout.guidelines.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
    </div>
  );
};

export default XlsxSetup;
