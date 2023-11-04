import { useEffect, useRef, useState } from "react";
import "./App.css";
import Keyboard from "./Components/Keyboard/Keyboard";
import randomParagraph from "random-paragraph";

function App() {
  const [para, setPara] = useState(randomParagraph({ sentences: 2 }));

  const strPara = para.split(" ");

  const [index, setIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [time, setTime] = useState(null);
  const [wordsTyped, setWordsTyped] = useState([]);
  const [totalIncWord, setTotalIncWord] = useState([]);
  const [totalWordsTyped, setTotalWordsTyped] = useState([]);
  const [incWord, setIncWord] = useState([]);
  const [showResult, setShowResult] = useState(false);

  

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
      console.log("Total incorrect words : ", totalIncWord);
      console.log("Total Words : ", totalWordsTyped);
      setTimerStarted(false);
      setInputText("");
      setShowResult(true);
      setIndex(0);
      setPara(randomParagraph({ sentences: 2 }))
      if (!alertShown.current) {
        alert("Time's up!");
        alertShown.current = true; // Set the ref to true to indicate that the alert has been shown
      }
    }
  };

  useEffect(() => {
    if (index === strPara.length) {
      // The user has completed the current paragraph
      setPara(randomParagraph({ sentences: 2 })); // Fetch a new random paragraph
      setIndex(0); // Reset the index
      setTotalIncWord([...totalIncWord, ...incWord]);
      setTotalWordsTyped([...totalWordsTyped, ...wordsTyped]);
      setIncWord([]);
      setWordsTyped([]);
  
    }
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
      if((word !== currWord+" ") && word !== " "){
        setIncWord([...incWord, word]);
      }
      setIndex(index + 1);
      (word !== " ") && setWordsTyped([...wordsTyped, inputText]);
      setInputText("");
    } else {
      setInputText(word);
    }
  };

  const handleRefresh = () => {
    setIndex(0);
    setInputText("");
    setWordsTyped([]);
    setTimerStarted(false);
    setInputText("");
    setShowResult(false);
  };


  return (
    <div className="container">
      {(showResult) && <div className="result-container">
        <div className="heading">Typing speed</div>
        <div className="fx" style={{ justifyContent: "space-between" }}>
          <div className="speed-val" style={{borderRight : "solid 1px #9ca5ac", width : "50%"}}>
            <span className="num">{totalWordsTyped.length} - {totalIncWord.length}</span> WPM ( Only correct words count )
          </div>
          <div className="word-text fx" style={{borderRight : "solid 1px #9ca5ac"}}>
            <span className="speed-val">Words count</span>
            <span className="val">{totalWordsTyped.length}</span>
          </div>
          <div className="word-text fx">
            <span className="speed-val">Accuracy</span>
            <span className="val">
              {
              (((wordsTyped.length - incWord.length)/wordsTyped.length)*100).toFixed(2)
              }%
            </span>
          </div>
        </div>
      </div>}
      <div className="App fx">
       {(!showResult) && <div className="paragraph">
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
                {(word === currWord && i === index) ? (
                  <span className="active" style={wordStyle}>
                    {word}
                  </span>
                ) : (
                  <span style={{ color: wordColor }}>{word}</span>
                )}
              </span>
            );
          })}
        </div>}
        <div className="inp-container fx">
          <input
            type="text"
            className="inptext"
            autoFocus={true}
            onChange={handleInputChange}
            value={inputText}
            disabled = {(showResult) && true}
          />

          <div className="timer">{updateTimer()}</div>
          <button 
          className="refresh fx" 
          title="Restart the test" 
          onClick={handleRefresh}
          style={{color : showResult && "#fff", backgroundColor : showResult && "#40d440", boxShadow : showResult && "0px 8px 15px #6eff6ed3, 1px 2px 5px #75ff759a"}}
          >
            <img
              className="icon"
              src="https://img.icons8.com/ios-glyphs/25/d3fcd3/refresh--v1.png"
              alt="refresh--v1"
            /> Restart
          </button>
        </div>
      </div>
      {(!showResult) && <Keyboard />}
    </div>
  );
}

export default App;
