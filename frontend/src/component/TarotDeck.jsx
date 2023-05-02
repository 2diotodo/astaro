import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import TaroBack from "@assets/img/Taro_back.png";
import ColContainer from "@component/layout/ColContainer";
import RowContainer from "@component/layout/RowContainer";
import "@css/tarocard.css";
import GapH from "@component/layout/GapH";
import Subtitle from "@component/text/Subtitle";
import { useDispatch } from "react-redux";
import { setCards, setCardsSeq } from "@features/tarotSlice";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

let cards = [
  { id: 1, name: "The Fool", image: TaroBack },
  { id: 2, name: "The Magician", image: TaroBack },
  { id: 3, name: "The High Priestess", image: TaroBack },
  { id: 4, name: "The Empress", image: TaroBack },
  { id: 5, name: "The Emperor", image: TaroBack },
  { id: 6, name: "The Hierophant", image: TaroBack },
  { id: 7, name: "The Lovers", image: TaroBack },
  { id: 8, name: "The Chariot", image: TaroBack },
  { id: 9, name: "Strength", image: TaroBack },
  { id: 10, name: "The Hermit", image: TaroBack },
  { id: 11, name: "Wheel of Fortune", image: TaroBack },
  { id: 12, name: "Justice", image: TaroBack },
  { id: 13, name: "The Hanged Man", image: TaroBack },
  { id: 14, name: "Death", image: TaroBack },
  { id: 15, name: "Temperance", image: TaroBack },
  { id: 16, name: "The Devil", image: TaroBack },
  { id: 17, name: "The Tower", image: TaroBack },
  { id: 18, name: "The Star", image: TaroBack },
  { id: 19, name: "The Moon", image: TaroBack },
  { id: 20, name: "The Sun", image: TaroBack },
  { id: 21, name: "Judgement", image: TaroBack },
  { id: 22, name: "The World", image: TaroBack },
];
cards = shuffle(cards);

const TarotDeck = () => {
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const coordinates = [175, 50, -75];
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardsSeq, setSelectedCardsSeq] = useState([]);

  useEffect(() => {}, []);

  const handleCardClick = (card) => {
    console.log(card);
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
    const curX = document
      .querySelector("#card" + card.id)
      .getBoundingClientRect().x;
    const toMove = 0.5 * window.innerWidth - curX - xPos;
    document
      .querySelector("#card" + card.id)
      .setAttribute("style", `transform: translate(${toMove}px, -215px); `);
    // Create a new array of selected cards with the clicked card on top
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
    <ColContainer height="470px" margin="5vh">
      <Subtitle>3장의 카드를 뽑아주세요.</Subtitle>
      <GapH height="260px" />
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
  );
};

const TarotCard = styled.div`
  position: absolute;
  width: 100px;
  height: 185px;
  border-radius: 5px;
  margin-right: -70px;
  transition: box-shadow 0.2s ease-in-out, transform 0.5s ease-in-out;
  animation-name: switchPosition;
  animation-delay: 2s;
  animation-fill-mode: forwards;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 5px #c8c8c8;
    transform: translateY(-30px);
  }

  @keyframes switchPosition {
    0% {
      position: absolute;
    }
    100% {
      position: relative;
    }
  }
`;

const TarotCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

export default TarotDeck;
