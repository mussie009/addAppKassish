import React from "react";

const ServerErrors = (props) => {
  if (!props.errors.length) {
    return null;
  }

  return (
    <div className="text-white mt-3">
      <p>
        <i id="warning-icon" className="fa fa-warning mr-3"></i>
        Serveren svarte med følgende feilmelding:
      </p>
      <ul>
        {props.errors.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
    </div>
  );
};

export default ServerErrors;
