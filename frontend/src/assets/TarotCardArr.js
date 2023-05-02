import TaroBack from "@assets/img/Taro_back.png";
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

let tarotCardArr = [
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
tarotCardArr = shuffle(tarotCardArr);

const TarotCardArr = tarotCardArr;

export default TarotCardArr;
