import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div
      id="error-component"
      style={{ width: "100%", height: 100, margin: 0, padding: 0 }}
    >
      <span>{errorMessage}</span>
    </div>
  );
};

export default Error;
