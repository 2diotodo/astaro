import RowContainer from "@component/layout/RowContainer";
import Button from "@component/Button";
import GapH from "@component/layout/GapH";
import React from "react";

function TarotCategory() {
  return (
    <>
      <div
        style={{
          margin: "25px",
          color: "white",
          fontSize: "30px",
        }}
      >
        무엇을 고민하고 있나요?
      </div>
      <RowContainer width="300px" style={{ justifyContent: "space-evenly" }}>
        <Button>결혼</Button>
        <Button>연애</Button>
      </RowContainer>
      <GapH height="2vh" />
      <RowContainer width="300px" style={{ justifyContent: "space-evenly" }}>
        <Button>학업</Button>
        <Button>취직</Button>
      </RowContainer>
    </>
  );
}

export default TarotCategory;
