import { useState } from "react";
import "./App.css";

function App() {

  const para = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat deserunt incidunt quasi ex, fuga at quis eos eligendi delectus,repellendus illo esse dicta ducimus nihil aliquid repudiandae quoillum sequi"

  const strPara = para.split(" ");
  
  const [index, setIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const currWord = strPara[index] || "";

  const wordStyle = {
    backgroundColor : ( inputText.slice(-1) === "" ) ? "#b7ccdf" : 
    (inputText === currWord.slice(0, inputText.length)) ? "#b7ccdf" : "#ff7272"
  }

  const [wordsTyped, setWordsTyped] = useState([]);


  const handleInputChange = (e)=>{
    const word = e.target.value ;
    if(word.charAt(word.length - 1) === " "){
      console.log("spacebar pressed");
      setIndex(index+1);
      setWordsTyped([...wordsTyped, inputText]);
      setInputText("");
    }else{
      setInputText(word);
    }
  }


  const handleRefresh = ()=>{
    setIndex(0)
    setInputText("");
  }

  return (
    <div className="container fx">
      <div className="App fx">
        <div className="paragraph">
          {
            strPara.map((word, i)=>{
              return <span key={i}> {
                (word === currWord) ?
                <span className="active" style={wordStyle}>{word}</span> : 
                <span> {
                  (wordsTyped.includes(word)) ? 
                  (
                    (word === wordsTyped[i]) ? <span>{word}</span> : <span style={{color : "red"}}></span>
                  ) : <span>{word}</span>
                } </span>
                
              }
              </span>
            })
          }
        </div>
        <div className="inp-container fx">


          <input 
          type="text" 
          className="inptext" 
          autoFocus={true}
          onChange={handleInputChange}
          value={inputText}
          />


          <div className="timer">1:00</div>
          <button className="refresh" title="Refresh" onClick={handleRefresh}>
            <img className="icon" src="https://img.icons8.com/ios-glyphs/30/ffffff/refresh--v1.png" alt="refresh--v1"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
