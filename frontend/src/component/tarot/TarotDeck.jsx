import React, { useEffect, useState } from "react";
import ColContainer from "@component/layout/ColContainer";
import RowContainer from "@component/layout/RowContainer";
import "@css/tarocard.css";
import GapH from "@component/layout/GapH";
import { useDispatch, useSelector } from "react-redux";
import {
  setStateCards,
  setStateCardsInfo,
  setStateCurrentCard,
} from "@features/tarotSlice";
import TarotCardArr from "@assets/TarotCardArr";
import TarotCard from "@component/tarot/TarotCard";
import SmallMedium from "@component/text/SmallMedium";
import Medium from "@component/text/Medium";

let tarotCardArr = TarotCardArr;

const TarotDeck = () => {
  const selectedCardWidth = Math.min(window.innerWidth * 0.28, 200);
  const selectedCardMargin = 15;
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const coordinates = [
    1.5 * selectedCardWidth + selectedCardMargin,
    0.5 * selectedCardWidth,
    -0.5 * selectedCardWidth - selectedCardMargin,
  ];
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardsSeq, setSelectedCardsSeq] = useState([]);
  const [currentCard, setCurrentCard] = useState([]);

  const handleCardClick = (card) => {
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
    const toMove = -xPos + 0.5 * selectedCardWidth;

    selectedCard.setAttribute(
      "style",
      `transform: translateY(-15vh) rotateY(-180deg) scale(2); z-index:300`
    );
    selectedCard.classList.add("selected-moving");
    setTimeout(() => {
      selectedCard.setAttribute(
        "style",
        `transform: translate(${toMove}px, -30vh) scale(1.2) rotateY(-180deg); zIndex:100`
      );
      selectedCard.classList.remove("selected-moving");
    }, 1000);

    setTimeout(() => {
      selectedCard.children[1].style.display = "none";
    }, 1000);

    let newSelectedCards = [...selectedCards];
    newSelectedCards.push(card.name);
    setSelectedCards(newSelectedCards);
    dispatch(setStateCards(newSelectedCards));

    setCurrentCard(card.name);

    let newSelectedCardsSeq = [...selectedCardsSeq];
    newSelectedCardsSeq.push(card);
    setSelectedCardsSeq(newSelectedCardsSeq);
    dispatch(setStateCardsInfo(newSelectedCardsSeq));
  };

  useEffect(() => {
    document
      .querySelector(".current-card-name")
      .animate([{ opacity: 0 }, { opacity: 1 }], 1000);
  }, [currentCard]);

  return (
    <ColContainer height="75vh">
      <GapH height="2vh" />
      <Medium className="current-card-name">{currentCard}</Medium>
      <GapH height="30vh" />
      <RowContainer
        justify="center"
        height="100%"
        className="filp-card"
        style={{ position: "relative" }}
      >
        {tarotCardArr.map((card) => (
          <TarotCard
            key={card.id}
            card={card}
            className="tarot-card"
            selected={selectedCards.includes(card)}
            onClick={() => {
              handleCardClick(card);
            }}
          />
        ))}
      </RowContainer>
      <GapH height="5vh" />
    </ColContainer>
  );
};

export default TarotDeck;
