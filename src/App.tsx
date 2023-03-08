import { useEffect, useState } from "react";
import "./App.scss";

import iconDice from "./assets/icon-dice.svg";
import patternDividerDesktop from "./assets/pattern-divider-desktop.svg";
import patternDividerMobile from "./assets/pattern-divider-mobile.svg";

export function App() {
  const [advice, setAdvice] = useState();
  const [number, setNumber] = useState();

  const getAdvice = async () => {
    await fetch("https://api.adviceslip.com/advice")
      .then((responce) => responce.json())
      .then((data) => {
        setAdvice(data.slip.advice);
        setNumber(data.slip.id);
      });
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <main>
      <div className="advice">
        <div className="advice__container">
          <div className="advice__title">
            <h1 className="advice__title">ADVICE #</h1>
            <h1 className="advice__title">{number}</h1>
          </div>

          {!advice ? (
            <p className="advice__quote advice__quote__loading">Loading...</p>
          ) : (
            <p className="advice__quote">"{advice}"</p>
          )}

          <img
            src={patternDividerMobile}
            className="advice__divider advice__divider__mobile"
            alt="Pattern Divider"
          />
          <img
            src={patternDividerDesktop}
            className="advice__divider advice__divider__desktop"
            alt="Pattern Divider"
          />
          <div onClick={getAdvice} className="advice__btn">
            <img src={iconDice} className="advice__dice" alt="Icon Dice" />
          </div>
        </div>
      </div>
    </main>
  );
}
