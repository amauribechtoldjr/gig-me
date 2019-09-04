import React from "react";
import gifLoading from "../../assets/images/loading.gif";

const Loading = () => {
  return (
    <div id="loading-component" style={{ width: 100, height: 100 }}>
      <img src={gifLoading} alt="Loading component!" />
    </div>
  );
};

export default Loading;
