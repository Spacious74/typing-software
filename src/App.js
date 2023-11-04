import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const para =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam numquam odit possimus eaque. Adipisci rerum beatae dignissimos deleniti consectetur ab nesciunt. Nam nobis repellat et atque porro! voluptates doloremque nulla similique blanditiis facilis voluptatibus quia obcaecati quis quaerat repellendus inventore assumenda.";

  const strPara = para.split(" ");

  const [index, setIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [time, setTime] = useState(null);
  const [incWord, setIncWord] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currWord = strPara[index] || "";

  const wordStyle = {
    backgroundColor:
      inputText.slice(-1) === ""
        ? "#b7ccdf"
        : inputText === currWord.slice(0, inputText.length)
        ? "#b7ccdf"
        : "#ff7272",
  };

  const [wordsTyped, setWordsTyped] = useState([]);

  const updateTimer = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (!timerStarted) {
      return `00:20`;
    }
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const countdown = () => {
    if (time > 0) {
      setTime(time - 1);
    } else {
      alert("Time's up!");
      setTimerStarted(false);
      setInputText("");
      setWordsTyped([]);
      setShowResult(true);
      setIndex(0);
      console.log(wordsTyped);
      console.log(incWord);
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
      setTime(20); // Setting time in seconds.
    }

    if (word.charAt(word.length - 1) === " ") {
      console.log(`word: ${word}, current Word: ${currWord}`);
      // console.log("spacebar pressed");
      if(word !== currWord+" "){
        setIncWord([...incWord, word]);
      }
      setIndex(index + 1);
      setWordsTyped([...wordsTyped, inputText]);
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
  };


  return (
    <div className="container">
      <div className="App fx">
        <div className="paragraph">
          {strPara.map((word, i) => {
            const typedWord = wordsTyped[i] || "";
            let wordColor = "#000";

            if (typedWord === word) {
              wordColor = "#000"; // Correctly typed word
            } else if (typedWord === word.slice(0, typedWord.length)) {
              wordColor = "#697c8b"; // Partially correct word
            } else {
              wordColor = "#ff0000";
            // Incorrect word
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
        </div>
        <div className="inp-container fx">
          <input
            type="text"
            className="inptext"
            autoFocus={true}
            onChange={handleInputChange}
            value={inputText}
          />

          <div className="timer">{updateTimer()}</div>
          <button className="refresh" title="Refresh" onClick={handleRefresh}>
            <img
              className="icon"
              src="https://img.icons8.com/ios-glyphs/30/ffffff/refresh--v1.png"
              alt="refresh--v1"
            />
          </button>
        </div>
      </div>
      {(showResult) && <div className="result-container">
        <div className="heading">Typing speed</div>
        <div className="fx" style={{ justifyContent: "space-between" }}>
          <div className="speed-val" style={{borderRight : "solid 1px #9ca5ac", width : "50%"}}>
            <span className="num">{wordsTyped.length - incWord.length}</span> WPM ( Only correct words count )
          </div>
          <div className="word-text fx" style={{borderRight : "solid 1px #9ca5ac"}}>
            <span className="speed-val">Words count</span>
            <span className="val">{wordsTyped.length}</span>
          </div>
          <div className="word-text fx">
            <span className="speed-val">Accuracy</span>
            <span className="val">{((wordsTyped.length - incWord.length)/wordsTyped.length)*100}</span>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
