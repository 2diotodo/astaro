import React from "react";
import { Rings } from "react-loader-spinner";
import ColContainer from "./layout/ColContainer";

function TarotLoading() {
  return (
    <div className="loadingContainer">
      <Rings
        height="80"
        width="80"
        color="#fff"
        opacity="0.5"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
}

export default TarotLoading;
