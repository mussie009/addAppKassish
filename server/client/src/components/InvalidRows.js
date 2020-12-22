import React from "react";

const InvalidRows = (props) => {

  const listRange = 3;

  if (!props.rows.length) {
    return null;
  }

  return (
    <div className="text-white mt-3">
      <p>
        <i id="warning-icon" className="fa fa-warning mr-3"></i>
        {props.rows.length} ugyldige postnumre oppdaget på følgende rader:
        </p>
      <ul>
        {props.rows.slice(0, listRange).map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
      {props.rows.length > listRange && <p>og {props.rows.length - listRange} andre rader...</p>}
    </div>
  );
};

export default InvalidRows;