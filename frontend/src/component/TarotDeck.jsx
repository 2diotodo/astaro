import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import TaroBack from "@assets/img/Taro_back.png";
import ColContainer from "@component/layout/ColContainer";
import RowContainer from "@component/layout/RowContainer";
import "@css/tarocard.css";

const TarotDeck = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const coordinates = [175, 50, -75];
  const [selectedCards, setSelectedCards] = useState([]);

  const cards = [
    { id: 1, name: "Card 1", image: TaroBack },
    { id: 2, name: "Card 2", image: TaroBack },
    { id: 3, name: "Card 3", image: TaroBack },
    { id: 4, name: "Card 1", image: TaroBack },
    { id: 5, name: "Card 2", image: TaroBack },
    { id: 6, name: "Card 3", image: TaroBack },
    { id: 7, name: "Card 1", image: TaroBack },
    { id: 8, name: "Card 2", image: TaroBack },
    { id: 9, name: "Card 3", image: TaroBack },
    { id: 10, name: "Card 1", image: TaroBack },
    { id: 11, name: "Card 2", image: TaroBack },
    { id: 12, name: "Card 3", image: TaroBack },
    { id: 13, name: "Card 1", image: TaroBack },
    { id: 14, name: "Card 2", image: TaroBack },
    { id: 15, name: "Card 3", image: TaroBack },
    { id: 16, name: "Card 1", image: TaroBack },
    { id: 17, name: "Card 2", image: TaroBack },
    { id: 18, name: "Card 3", image: TaroBack },
    { id: 19, name: "Card 1", image: TaroBack },
    { id: 20, name: "Card 2", image: TaroBack },
    { id: 21, name: "Card 3", image: TaroBack },
    { id: 22, name: "Card 1", image: TaroBack },
  ];

  const handleCardClick = (card) => {
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
    const curX = document
      .querySelector("#card" + card.id)
      .getBoundingClientRect().x;
    const toMove = 0.5 * window.innerWidth - curX - xPos;
    document
      .querySelector("#card" + card.id)
      .setAttribute("style", `transform: translate(${toMove}px, -215px); `);
    // Create a new array of selected cards with the clicked card on top
    let newSelectedCards = [...selectedCards];
    newSelectedCards.push(card);
    setSelectedCards(newSelectedCards);
  };

  useEffect(() => {}, []);

  return (
    <TarotDeckContainer>
      <ColContainer>
        <RowContainer style={{ position: "relative" }}>
          {cards.map((card) => (
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
    </TarotDeckContainer>
  );
};

const TarotDeckContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TarotCard = styled.div`
  position: relative;
  width: 100px;
  height: 185px;
  border-radius: 5px;
  margin-right: -70px;
  transition: box-shadow 0.2s ease-in-out, transform 0.5s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 5px #c8c8c8;
    transform: translateY(-30px);
  }
`;

const TarotCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

export default TarotDeck;
