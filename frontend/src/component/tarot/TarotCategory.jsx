import React from "react";
import { useDispatch } from "react-redux";
import RowContainer from "@component/layout/RowContainer";
import Button from "@component/Button";
import GapH from "@component/layout/GapH";
import { setStateCategory } from "@features/tarotSlice";

function TarotCategory() {
  const dispatch = useDispatch();
  const handleCategory = (event) => {
    dispatch(setStateCategory(event.target.innerText));
  };

  return (
    <>
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
      <RowContainer width="300px" style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleCategory}>결혼</Button>
        <Button onClick={handleCategory}>연애</Button>
      </RowContainer>
      <GapH height="2vh" />
      <RowContainer width="300px" style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleCategory}>학업</Button>
        <Button onClick={handleCategory}>취직</Button>
      </RowContainer>
      <GapH height="2vh" />
      <RowContainer width="300px" style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleCategory}>이직</Button>
        <Button onClick={handleCategory}>사업</Button>
      </RowContainer>
    </>
  );
}

export default TarotCategory;
