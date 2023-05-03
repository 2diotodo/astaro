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
  const selectedCardWidth = 100 * 1.24;
  const selectedCardMargin = 10;
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const coordinates = [
    1.5 * selectedCardWidth - selectedCardMargin,
    0.5 * selectedCardWidth - 2 * selectedCardMargin,
    -0.5 * selectedCardWidth - 3 * selectedCardMargin,
  ];
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
      `transform: translate(${toMove}px, -240px) rotateY(-180deg);`
    );

    setTimeout(()=>{
      selectedCard.children[1].style.display = 'none';
    }, 1000)

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
    <ColContainer height="75vh">
      <GapH height="4vh" />
      <Subtitle>3장의 카드를 뽑아주세요.</Subtitle>
      <GapH height="350px" />
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
