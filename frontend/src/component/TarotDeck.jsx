import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ColContainer from "@component/layout/ColContainer";
import RowContainer from "@component/layout/RowContainer";
import "@css/tarocard.scss";
import GapH from "@component/layout/GapH";
import Subtitle from "@component/text/Subtitle";
import { useDispatch } from "react-redux";
import { setCards, setCardsSeq } from "@features/tarotSlice";
import TarotCard from "@component/TarotCard";
import TarotCardArr from "@assets/TarotCardArr";

let tarotCardArr = TarotCardArr;

const TarotDeck = () => {
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const coordinates = [175, 50, -75];
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardsSeq, setSelectedCardsSeq] = useState([]);

  useEffect(() => {}, []);

  const handleCardClick = (card) => {
    if (
      document
        .querySelector("#card" + card.id)
        .classList.contains("selected-tarocard")
    ) {
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
    document
      .querySelector("#card" + card.id)
      .classList.add("selected-tarocard");
    const toMove = -xPos + 50;
    document
      .querySelector("#card" + card.id)
      .setAttribute("style", `transform: translate(${toMove}px, -215px); `);

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
      <RowContainer justify="center" height="100%" class="filp-card">
        {tarotCardArr.map((card) => (
          <TarotCard
            className="tarot-card"
            id={"card" + card.id}
            key={card.id}
            selected={selectedCards.includes(card)}
            onClick={() => {
              handleCardClick(card);
            }}
          >
            <TarotCardImage src={card.image} alt={card.name} />
          </TarotCard>
        ))}
      </RowContainer>
    </ColContainer>
  );
};

const TarotCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

export default TarotDeck;
