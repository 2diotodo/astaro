import React from "react";
import { Rings } from "react-loader-spinner";
import ColContainer from "./layout/ColContainer";
import SmallMedium from "@component/text/SmallMedium";
import Small from "@component/text/Small";
import GapH from "@component/layout/GapH";

function TarotLoading() {
  return (
    <ColContainer height="50vh">
      <SmallMedium>점괘를 해석중입니다.</SmallMedium>
      <br />
      <SmallMedium>잠시 기다려주시기 바랍니다.</SmallMedium>
      <br />
      <br />
      <Small>점괘 해석은 1분 정도 소요될 수 있습니다.</Small>
      <GapH height="90px" />
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
