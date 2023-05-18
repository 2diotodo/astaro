import { useState } from "react";
import cards from "@constants/carddata.json";
import tarot_back from "@assets/img/taro_back_.png";
import "@css/flipgame.css";
import Button from "@component/Button";
import Medium from "@component/text/Medium";
import GapH from "@component/layout/GapH";

const Card = ({ id, name, flipped, matched, clicked }) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={
        "game-card" + (flipped ? " flipped" : "") + (matched ? " matched" : "")
      }
    >
      <div className="game-back">
        <img alt="back" src={tarot_back} />
      </div>
      <div className="game-front">
        <img alt={name} src={"img/" + name + ".png"} />
      </div>
    </div>
  );
};

function FlipGame() {
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  ///////////// SETUP /////////////

  const [cardList, setCardList] = useState(
    shuffle(cards).map((card, index) => {
      return {
        id: index,
        name: card.cardItem,
        flipped: false,
        matched: false,
      };
    })
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  ///////////// GAME LOGIC /////////////

  const handleClick = (name, index) => {
    let currentCard = {
      name,
      index,
    };

    //update card is flipped
    let updateCards = cardList.map((card) => {
      if (card.id === index) {
        card.flipped = true;
      }
      return card;
    });
    let updateFlipped = flippedCards;
    updateFlipped.push(currentCard);
    setFlippedCards(updateFlipped);
    setCardList(updateCards);

    //if 2 cards are flipped, check if they are a match
    if (flippedCards.length === 2) {
      setTimeout(() => {
        check();
      }, 750);
    }
  };

  const check = () => {
    let updateCards = cardList;
    if (
      flippedCards[0].name === flippedCards[1].name &&
      flippedCards[0].index !== flippedCards[1].index
    ) {
      updateCards[flippedCards[0].index].matched = true;
      updateCards[flippedCards[1].index].matched = true;
      isGameOver();
    } else {
      updateCards[flippedCards[0].index].flipped = false;
      updateCards[flippedCards[1].index].flipped = false;
    }
    setCardList(updateCards);
    setFlippedCards([]);
  };

  const isGameOver = () => {
    let done = true;
    cardList.forEach((card) => {
      if (!card.matched) done = false;
    });
    setGameOver(done);
  };

  ///////////// RESTART - REDO SETUP /////////////

  const restartGame = () => {
    setCardList(
      shuffle(cards).map((card, index) => {
        return {
          id: index,
          name: card.cardItem,
          flipped: false,
          matched: false,
        };
      })
    );

    setFlippedCards([]);
    setGameOver(false);
  };

  const GameOver = ({ restartGame }) => {
    return (
      <div className="game-result-centered">
        {/* <h1>{savedTime !== null ? formatElapsedTime(savedTime) : ""}</h1> */}
        <Medium>10 lux 획득!</Medium>
        <GapH height="10vh"/>
        <Button className="restart-button" onClick={restartGame}>
          한번 더?
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className="game-board">
        {!gameOver &&
          cardList.map((card, index) => (
            <Card
              key={index}
              id={index}
              name={card.name}
              flipped={card.flipped}
              matched={card.matched}
              clicked={flippedCards.length === 2 ? () => {} : handleClick}
            />
          ))}
        {gameOver && <GameOver restartGame={restartGame} />}
      </div>
    </>
  );
}

export default FlipGame;
