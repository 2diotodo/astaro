import TarotFront1 from "@assets/img/fliped_tarot_img/1-01.png";
import TarotFront2 from "@assets/img/fliped_tarot_img/1-02.png";
import TarotFront3 from "@assets/img/fliped_tarot_img/1-03.png";
import TarotFront4 from "@assets/img/fliped_tarot_img/1-04.png";
import TarotFront5 from "@assets/img/fliped_tarot_img/1-05.png";
import TarotFront6 from "@assets/img/fliped_tarot_img/1-06.png";
import TarotFront7 from "@assets/img/fliped_tarot_img/1-07.png";
import TarotFront8 from "@assets/img/fliped_tarot_img/1-08.png";
import TarotFront9 from "@assets/img/fliped_tarot_img/1-12.png";
import TarotFront10 from "@assets/img/fliped_tarot_img/1-10.png";
import TarotFront11 from "@assets/img/fliped_tarot_img/1-11.png";
import TarotFront12 from "@assets/img/fliped_tarot_img/1-09.png";
import TarotFront13 from "@assets/img/fliped_tarot_img/1-13.png";
import TarotFront14 from "@assets/img/fliped_tarot_img/1-14.png";
import TarotFront15 from "@assets/img/fliped_tarot_img/1-15.png";
import TarotFront16 from "@assets/img/fliped_tarot_img/1-16.png";
import TarotFront17 from "@assets/img/fliped_tarot_img/1-17.png";
import TarotFront18 from "@assets/img/fliped_tarot_img/1-18.png";
import TarotFront19 from "@assets/img/fliped_tarot_img/1-19.png";
import TarotFront20 from "@assets/img/fliped_tarot_img/1-20.png";
import TarotFront21 from "@assets/img/fliped_tarot_img/1-21.png";
import TarotFront22 from "@assets/img/fliped_tarot_img/1-22.png";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

let tarotCardArr = [
  { id: 1, name: "The Fool", image: TarotFront1 },
  { id: 2, name: "The Magician", image: TarotFront2 },
  { id: 3, name: "The High Priestess", image: TarotFront3 },
  { id: 4, name: "The Empress", image: TarotFront4 },
  { id: 5, name: "The Emperor", image: TarotFront5 },
  { id: 6, name: "The Hierophant", image: TarotFront6 },
  { id: 7, name: "The Lovers", image: TarotFront7 },
  { id: 8, name: "The Chariot", image: TarotFront8 },
  { id: 9, name: "Strength", image: TarotFront9 },
  { id: 10, name: "The Hermit", image: TarotFront10 },
  { id: 11, name: "Wheel of Fortune", image: TarotFront11 },
  { id: 12, name: "Justice", image: TarotFront12 },
  { id: 13, name: "The Hanged Man", image: TarotFront13 },
  { id: 14, name: "Death", image: TarotFront14 },
  { id: 15, name: "Temperance", image: TarotFront15 },
  { id: 16, name: "The Devil", image: TarotFront16 },
  { id: 17, name: "The Tower", image: TarotFront17 },
  { id: 18, name: "The Star", image: TarotFront18 },
  { id: 19, name: "The Moon", image: TarotFront19 },
  { id: 20, name: "The Sun", image: TarotFront20 },
  { id: 21, name: "Judgement", image: TarotFront21 },
  { id: 22, name: "The World", image: TarotFront22 },
];
tarotCardArr = shuffle(tarotCardArr);

const TarotCardArr = tarotCardArr;

export default TarotCardArr;
