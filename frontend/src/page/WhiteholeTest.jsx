import React, { useEffect } from "react";
import "../css/prompt.css";
export function WhiteholeTest() {
  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "./js/prompt.js";
    // script.async = true;
    // document.body.appendChild(script);
  });
  return (
    <>
      <div className="cmd-prompt">
        <span className="prompt">$</span>
        <input type="text" className="input-field" />
        <span className="cursor" />
      </div>
    </>
  );
}
