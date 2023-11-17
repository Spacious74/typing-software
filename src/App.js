// Protype.com- website name
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Keyboard from "./Components/Keyboard/Keyboard";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import {paraArr, l1, l2} from "./data";
import Result from "./Components/Result/Result";

function App() {

  const [paraData, setParaData] = useState(paraArr);
  const [level, setLevel] = useState("E");
  const [lvlStatus, setlvlStatus] = useState(false);


  // state variable for setting initial paragraph index
  const [paraIndex, setParaIndex] = useState(0);
  if(paraIndex === paraData.length-1){
    setParaIndex(0);
  }
  const [para, setPara] = useState(paraData[paraIndex]);
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
      setPara(paraData[paraIndex]);
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
    if(level === "E" && lvlStatus){
      setParaData(paraArr);
      setlvlStatus(false);
    }else if(level === "M" && lvlStatus){
      setParaData(l1); 
      setlvlStatus(false);
    }else if(level === "H" && lvlStatus){
      setParaData(l2);
      setlvlStatus(false);
    }
    setPara(paraData[paraIndex]);
    // eslint-disable-next-line
  }, [time, timerStarted, lvlStatus]);

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
        setPara(paraData[paraIndex+1]);
      }

    } else {
      setInputText(word);
    }
  };

  const handleRefresh = () => {
    setParaIndex(paraIndex+1);
    setPara(paraData[paraIndex+1])
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

  const handleLevelChange = (e)=>{
    setLevel(e.target.value);
    setlvlStatus(true);
  }

  return (
    <>
    <Navbar />
    <div className="container">

      {/* Result Section */}
      {showResult && (
        <Result totalIncWord={totalIncWord} totalWordsTyped={totalWordsTyped} />      )}
      
      {/* Paragraph and input section */}
      <div className="App fx">
        {!showResult && (
          // Paragraph
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
        {/* Input, timer and button container */}
        <div className="inp-container fx">
          {/* Input field */}
          <input
            type="text"
            className="inptext"
            autoFocus={true}
            onChange={handleInputChange}
            value={inputText}
            disabled={showResult && true}
          />

        {/* Timer section  */}
        <div className="timer">{updateTimer()}</div>

          {/* Restart Button */}
          <button
            className="refresh fx"
            title="Restart the test"
            onClick={handleRefresh}
            style={{
              color: showResult && "#fff",
              backgroundColor: showResult && "#40d440",
              boxShadow:
                showResult && "0px 8px 15px #6eff6ed3, 1px 2px 5px #75ff759a",}}
          >
            <img
              className="icon"
              src="https://img.icons8.com/ios-glyphs/25/d3fcd3/refresh--v1.png"
              alt="refresh"/>{" "}Restart
          
          </button>

          {/* Level setter */}
          <div className="level-cont">
            <select name="level" id="lvl" className="level" onChange={handleLevelChange}>
              <option value="E">🏃🏻‍♂️ Easy</option>
              <option value="M">🚶🏻‍♂️ Medium</option>
              <option value="H">🧍🏻‍♂️ Hard</option>
            </select>
          </div>

        </div>
      </div>
      {/* Keyboard component */}
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
