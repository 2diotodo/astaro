import React from "react";
import { Rings } from "react-loader-spinner";
import ColContainer from "../layout/ColContainer";
import SmallMedium from "@component/text/SmallMedium";
import Small from "@component/text/Small";
import GapH from "@component/layout/GapH";

function TarotLoading() {
  return (
    <ColContainer height="30vh">
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
    </ColContainer>
  );
}

export default TarotLoading;
