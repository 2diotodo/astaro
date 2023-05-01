import React, { useEffect } from "react";
import "@css/default.css";
import "@css/noite.css";

function init() {
  //estrelas

  var style = ["style1", "style2", "style3", "style4"];
  var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  var opacity = [
    "opacity1",
    "opacity1",
    "opacity1",
    "opacity2",
    "opacity2",
    "opacity3",
  ];

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var estrela = "";
  var qtdeEstrelas = 300;
  var noite = document.querySelector(".constelacao");
  // var widthWindow = window.innerWidth;
  // var heightWindow = window.innerHeight;
  // eslint-disable-next-line no-restricted-globals
  var widthWindow = screen.width;
  // eslint-disable-next-line no-restricted-globals
  var heightWindow = screen.height;

  for (var i = 0; i < qtdeEstrelas; i++) {
    estrela +=
      "<span class='estrela " +
      style[getRandomArbitrary(0, 4)] +
      " " +
      opacity[getRandomArbitrary(0, 6)] +
      " " +
      tam[getRandomArbitrary(0, 5)] +
      "' style='animation-delay: ." +
      getRandomArbitrary(0, 9) +
      "s; left: " +
      getRandomArbitrary(-widthWindow, widthWindow) +
      "px; top: " +
      getRandomArbitrary(0, heightWindow) +
      "px;'></span>";
  }

  noite.innerHTML = estrela;

  var numeroAleatorio = 5000;

  setTimeout(function () {
    carregarMeteoro();
  }, numeroAleatorio);

  function carregarMeteoro() {
    setTimeout(carregarMeteoro, numeroAleatorio);
    numeroAleatorio = getRandomArbitrary(5000, 10000);
    var meteoro =
      "<div class='meteoro " + style[getRandomArbitrary(0, 4)] + "'></div>";
    document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = meteoro;
    setTimeout(function () {
      document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = "";
    }, 1000);
  }
}

export function Background() {
  window.onload = init;

  return (
    <>
      <div className="noite"></div>
      <div className="constelacao"></div>
      <div className="chuvaMeteoro"></div>
      <div className="floresta">
        <img src="bgTree.png" alt="" />
      </div>
    </>
  );
}
