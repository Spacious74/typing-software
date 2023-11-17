import React from 'react'
import './Result.css'

function Result({totalIncWord, totalWordsTyped}) {
  return (
    <div>
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

    </div>
  )
}

export default Result
