import React, { useEffect } from "react";
import "../css/default.css";
import "../css/noite.css";
function Test() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./js/status.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <>
      <div className="noite"></div>

      <div className="constelacao"></div>

      <div className="lua">
        <div className="textura"></div>
      </div>

      <div className="chuvaMeteoro"></div>

      <div className="floresta">
        <img src="bgTree.png" alt="" />
      </div>
      <script src="https://unpkg.com/@h0rn0chse/night-sky/dist/bundle.min.js" />
    </>
  );
}

export default Test;
