// Protype.com- website name
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Keyboard from "./Components/Keyboard/Keyboard";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import paraArr from "./data";

function App() {
  // state variable for setting initial paragraph
  const [paraIndex, setParaIndex] = useState(0);
  if(paraIndex === paraArr.length-1){
    setParaIndex(0);
  }
  const [para, setPara] = useState(paraArr[paraIndex]);
  const strPara = para.split(" "); // making array of strings for paragraph.

  // Setting current word index to 0 by default index is 0 its means that current word is at strPara(0).
  const [index, setIndex] = useState(0);

  // This inputText variable is for input field where user is typing
  const [inputText, setInputText] = useState("");

  // By default timerStarted is false when user started typing this variable set to true and timer starts
  const [timerStarted, setTimerStarted] = useState(false);

  // This time variable is for time left which is updated every second how ? see the rest code below.
  const [time, setTime] = useState(null);

  // This wordsTyped variable is for saving the words that is typed by the user completely in a single paragraph.
  const [wordsTyped, setWordsTyped] = useState([]);

  // This incWord variable collects wrong words typed by the user in a single paragraph
  const [incWord, setIncWord] = useState([]);

  // This totalIncWord variable is used to collect all wrong words in multiple paragraphs.
  const [totalIncWord, setTotalIncWord] = useState([]);

  // Same here this totalWordsTyped variable is used to collect all words in multiple paragraphs.
  const [totalWordsTyped, setTotalWordsTyped] = useState([]);

  // This showResult variable is used to display the result when timer ends.
  const [showResult, setShowResult] = useState(false);

  // Here we are setting the currWord.
  const currWord = strPara[index] || "";

  const wordStyle = {
    backgroundColor:
      inputText.slice(-1) === ""
        ? "#d0dfec"
        : inputText === currWord.slice(0, inputText.length)
        ? "#d0dfec"
        : "#ffa4a4",
  };

  const updateTimer = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (!timerStarted) {
      return `01:00`;
    }
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const alertShown = useRef(false);
  const countdown = () => {
    if (time > 0) {
      setTime(time - 1);
    } else {
      setTimerStarted(false);
      setInputText("");
      setShowResult(true);
      setIndex(0);
      setTotalIncWord([...totalIncWord, ...incWord]);
      setTotalWordsTyped([...totalWordsTyped, ...wordsTyped]);
      setPara(paraArr[paraIndex]);
      if (!alertShown.current) {
        alert("Time's up!");
        alertShown.current = true; // Set the ref to true to indicate that the alert has been shown
      }
    }
  };

  useEffect(() => {
    if (timerStarted) {
      const timeInterval = setInterval(countdown, 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
    // eslint-disable-next-line
  }, [time, timerStarted]);

  const handleInputChange = (e) => {
    const word = e.target.value;
    if (!timerStarted) {
      setTimerStarted(true);
      setTime(60); // Setting time in seconds.
    }

    if (word.charAt(word.length - 1) === " ") {
      if (word !== currWord + " ") {
        setIncWord([...incWord, word]);
      }
      setIndex(index + 1);
      setWordsTyped([...wordsTyped, inputText]);
      setInputText("");

      if(index === strPara.length-1){
        setIndex(0); // Reset the index
        setTotalIncWord([...totalIncWord, ...incWord]);
        setTotalWordsTyped([...totalWordsTyped, ...wordsTyped]);
        setIncWord([]);
        setWordsTyped([]);
        setParaIndex(paraIndex+1);
        setPara(paraArr[paraIndex+1]);
      }

    } else {
      setInputText(word);
    }
  };

  const handleRefresh = () => {
    setParaIndex(paraIndex+1);
    setPara(paraArr[paraIndex+1])
    setIndex(0);
    setInputText("");
    setWordsTyped([]);
    setIncWord([]);
    setTimerStarted(false);
    setInputText("");
    setShowResult(false);
    setTotalIncWord([]);
    setTotalWordsTyped([]);
  };

  return (
    <>
    <Navbar />
    <div className="container">
      {showResult && (
        <div className="result-container">
          <div className="heading">Typing speed</div>
          <div className="fx" style={{ justifyContent: "space-between" }}>
            <div
              className="speed-val"
              style={{ borderRight: "solid 1px #9ca5ac", width: "50%" }}
            >
              <span className="num">
                {totalWordsTyped.length - totalIncWord.length}
              </span>{" "}
              WPM ( Only correct words count )
            </div>
            <div
              className="word-text fx"
              style={{ borderRight: "solid 1px #9ca5ac" }}
            >
              <span className="speed-val">Words count</span>
              <span className="val">{totalWordsTyped.length}</span>
            </div>
            <div className="word-text fx">
              <span className="speed-val">Accuracy</span>
              <span className="val">
                {(
                  ((totalWordsTyped.length - totalIncWord.length) /
                    totalWordsTyped.length) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="App fx">
        {!showResult && (
          <div className="paragraph">
            {strPara.map((word, i) => {
              const typedWord = wordsTyped[i] || "";
              let wordColor = "#000";

              if (typedWord === word) {
                wordColor = "#000"; // Correctly typed word
              } else if (typedWord === word.slice(0, typedWord.length)) {
                wordColor = "#697c8b"; // Partially correct word
              } else {
                wordColor = "#ff0000"; // Incorrect word
              }

              return (
                <span key={i}>
                  {" "}
                  {i === index ? (
                    <span className="active" style={wordStyle}>
                      {word}
                    </span>
                  ) : (
                    <span style={{ color: wordColor }}>{word}</span>
                  )}
                </span>
              );
            })}
          </div>
        )}
        <div className="inp-container fx">
          <input
            type="text"
            className="inptext"
            autoFocus={true}
            onChange={handleInputChange}
            value={inputText}
            disabled={showResult && true}
          />

          <div className="timer">{updateTimer()}</div>
          <button
            className="refresh fx"
            title="Restart the test"
            onClick={handleRefresh}
            style={{
              color: showResult && "#fff",
              backgroundColor: showResult && "#40d440",
              boxShadow:
                showResult && "0px 8px 15px #6eff6ed3, 1px 2px 5px #75ff759a",
            }}
          >
            <img
              className="icon"
              src="https://img.icons8.com/ios-glyphs/25/d3fcd3/refresh--v1.png"
              alt="refresh--v1"
            />{" "}
            Restart
          </button>
        </div>
      </div>
      {!showResult && <Keyboard />}
    </div>
    <div className="message fx">
    <img width="48" height="48" src="https://img.icons8.com/color/48/break--v4.png" alt="break--v4"/> <br />
      Please open in Desktop or Laptop
    </div>
    <Footer />
    </>
  );
}

export default App;
