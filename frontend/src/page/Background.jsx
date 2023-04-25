import React, { useEffect } from "react";
import "../css/default.css";
import "../css/noite.css";

export function Background() {
  function handleStar() {
    const script = document.createElement("script");
    script.src = "./js/status.js";
    script.async = true;
    document.body.appendChild(script);
  }

  useEffect(() => {
    handleStar();
  }, []);

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
