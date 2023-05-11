import React from "react";
import { useDispatch } from "react-redux";
import RowContainer from "@component/layout/RowContainer";
import Button from "@component/Button";
import GapH from "@component/layout/GapH";
import { setStateCategory } from "@features/tarotSlice";
import UpDownContainer from "@component/layout/UpDownContainer";

function TarotCategory() {
  const dispatch = useDispatch();
  const handleCategory = (event) => {
    dispatch(setStateCategory(event.target.innerText));
  };

  return (
    <UpDownContainer width="100%">
      <div
        style={{
          margin: "50px",
          color: "white",
          fontSize: "20px",
        }}
      >
        무엇을 고민하고 있나요?
      </div>
      <GapH height="50px" />
      <RowContainer style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleCategory}>결혼</Button>
        <Button onClick={handleCategory}>연애</Button>
      </RowContainer>
      <GapH height="2vh" />
      <RowContainer style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleCategory}>학업</Button>
        <Button onClick={handleCategory}>취직</Button>
      </RowContainer>
      <GapH height="2vh" />
      <RowContainer style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleCategory}>이직</Button>
        <Button onClick={handleCategory}>사업</Button>
      </RowContainer>
      <GapH height="2vh" />
      <RowContainer style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleCategory}>금전</Button>
        <Button onClick={handleCategory}>건강</Button>
      </RowContainer>
    </UpDownContainer>
  );
}

export default TarotCategory;
