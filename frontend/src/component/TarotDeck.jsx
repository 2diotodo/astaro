import React, { useEffect, useState } from "react";
import ColContainer from "@component/layout/ColContainer";
import RowContainer from "@component/layout/RowContainer";
import "@css/tarocard.scss";
import GapH from "@component/layout/GapH";
import Subtitle from "@component/text/Subtitle";
import { useDispatch } from "react-redux";
import { setCards, setCardsSeq } from "@features/tarotSlice";
import TarotCardArr from "@assets/TarotCardArr";
import TarotCard from "@component/TarotCard";

let tarotCardArr = TarotCardArr;

const TarotDeck = () => {
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const coordinates = [175, 50, -75];
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardsSeq, setSelectedCardsSeq] = useState([]);

  useEffect(() => {}, []);

  const handleCardClick = (card) => {
    console.log(card);
    let selectedCard = document.querySelector("#card" + card.id);
    if (selectedCard.classList.contains("selected-tarocard")) {
      return;
    }
    if (cardIndex > 2) {
      window.alert(
        "카드는 3장까지만 고를 수 있습니다. 타로 보기를 눌러주세요."
      );
      return;
    }
    const xPos = coordinates[cardIndex];
    setCardIndex(cardIndex + 1);
    selectedCard.classList.add("selected-tarocard");
    const toMove = -xPos + 50;

    selectedCard.setAttribute(
      "style",
      `transform: translate(${toMove}px, -215px) rotateY(-180deg);`
    );

    let newSelectedCards = [...selectedCards];
    newSelectedCards.push(card.name);
    setSelectedCards(newSelectedCards);
    dispatch(setCards(newSelectedCards));

    let newSelectedCardsSeq = [...selectedCardsSeq];
    newSelectedCardsSeq.push(card.id);
    setSelectedCardsSeq(newSelectedCardsSeq);
    dispatch(setCardsSeq(newSelectedCardsSeq));
  };

  return (
    <ColContainer height="80vh">
      <Subtitle>3장의 카드를 뽑아주세요.</Subtitle>
      <GapH height="300px" />
      <RowContainer
        justify="center"
        height="100%"
        class="filp-card"
        style={{ position: "relative" }}
      >
        {tarotCardArr.map((card) => (
          <TarotCard
            card={card}
            selected={selectedCards.includes(card)}
            onClick={() => {
              handleCardClick(card);
            }}
          />
        ))}
      </RowContainer>
    </ColContainer>
  );
};

export default TarotDeck;
