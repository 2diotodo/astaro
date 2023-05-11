import { useState } from "react";
import cards from "@constants/carddata.json";
import tarot_back from "@assets/img/taro_back_.png";

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
  // timer
  const [savedTime, setSavedTime] = useState(0);

  const formatElapsedTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time - hours * 3600000) / 60000);
    const seconds = Math.floor(
      (time - hours * 3600000 - minutes * 60000) / 1000
    );
    const milliseconds = Math.floor((time % 1000) / 100);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString()}`;
  };
  ///////////// HELPER FUNCTION /////////////

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
  const [gameOverTime, setGameOverTime] = useState("");

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

  const [elapsed, setElapsed] = useState(null);

  const isGameOver = () => {
    let done = true;
    cardList.forEach((card) => {
      if (!card.matched) done = false;
    });
    setGameOver(done);
    // const currentTime = timerRef.current.getTime();
    const formattedTime = formatElapsedTime(elapsed);
    setGameOverTime(formattedTime);
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
        <h1>10 lux 획득!</h1>
        <button className="restart-button" onClick={restartGame}>
          한번 더?
        </button>
        <button className="ranking-button" onClick={restartGame}>
          랭킹 보기
        </button>
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
