import React, { useEffect } from 'react'
import './Keyboard.css'

function Keyboard() {

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = String.fromCharCode(event.keyCode);
      let keyElement = document.getElementById(keyPressed);

      if (event.keyCode === 8) {
        return;
      }

      if (event.key === "Control") {
        if (event.ctrlKey) {
          if (event.location === 1) {
            keyElement = document.getElementById("ctrl");
          } else if (event.location === 2) {
            keyElement = document.getElementById("ctrlright");
          }
        }
      }

      if (event.key === "Alt") {
        if (event.altKey) {
          if (event.location === 1) {
            keyElement = document.getElementById("alt");
          }
        }
      }

      if (event.key === "Enter") {
        keyElement = document.getElementById("enter");
      }

      if (event.key === "Shift") {
        if (event.shiftKey) {
          if (event.location === 1) {
            keyElement = document.getElementById("left-shift");
          } else if (event.location === 2) {
            keyElement = document.getElementById("right-shift");
          }
        }
      }

      if (event.keyCode === 222) {
        keyElement = document.getElementById("apost");
      }

      if (event.keyCode === 188) {
        keyElement = document.getElementById("comma");
      }

      if (event.keyCode === 190) {
        keyElement = document.getElementById("dot");
      }

      if (event.keyCode === 191) {
        keyElement = document.getElementById("slash");
      }

      if (event.keyCode === 186) {
        keyElement = document.getElementById("semicolon");
      }

      if (event.key === " ") {
        keyElement = document.getElementById("space");
      }

      if (event.key === "[") {
        keyElement = document.getElementById("leftsq");
      }

      if (event.key === "]") {
        keyElement = document.getElementById("rightsq");
      }

      if (event.key === "\\") {
        keyElement = document.getElementById("backslash");
      }

      if (keyElement == null) {
        return;
      }

      keyElement.classList.add("hit");
      keyElement.addEventListener("animationend", () => {
        keyElement.classList.remove("hit");
      });
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  

  return (
    <div className="keyboard">
        <ul className="row row-1">
            <li className="pinky" id="tab">TAB</li>
            <li className="pinky" id="Q">Q</li>
            <li className="ring" id="W">W</li>
            <li className="middle" id="E">E</li>
            <li className="pointer1st" id="R">R</li>
            <li className="pointer2nd" id="T">T</li>
            <li className="pointer2nd" id="Y">Y</li>
            <li className="pointer1st" id="U">U</li>
            <li className="middle" id="I">I</li>
            <li className="ring" id="O">O</li>
            <li className="pinky" id="P">P</li>
            <li className="pinky" id="leftsq">[</li>
            <li className="pinky" id="rightsq">]</li>
            <li className="pinky" id="backslash">\</li>
        </ul>
        <ul className="row row-2">
            <li className="pinky" id="caps">CAPS</li>
            <li className="pinky" id="A">A</li>
            <li className="ring" id="S">S</li>
            <li className="middle" id="D">D</li>
            <li className="pointer1st" id="F">F</li>
            <li className="pointer2nd" id="G">G</li>
            <li className="pointer2nd" id="H">H</li>
            <li className="pointer1st" id="J">J</li>
            <li className="middle" id="K">K</li>
            <li className="ring" id="L">L</li>
            <li className="pinky" id="semicolon">;</li>
            <li className="pinky" id="apost">''</li>
            <li className="pinky" id="enter">ENTER</li>
        </ul>
        <ul className="row row-3">
            <li className="pinky" id="left-shift">SHIFT</li>
            <li className="pinky" id="Z">Z</li>
            <li className="ring" id="X">X</li>
            <li className="middle" id="C">C</li>
            <li className="pointer1st" id="V">V</li>
            <li className="pointer2nd" id="B">B</li>
            <li className="pointer2nd" id="N">N</li>
            <li className="pointer1st" id="M">M</li>
            <li className="middle" id="comma">,</li>
            <li className="ring" id="dot">.</li>
            <li className="pinky" id="slash">/</li>
            <li className="pinky" id="right-shift">SHIFT</li>
        </ul>
        <ul className="row row-0">
            <li className="pinky" id="ctrl">Ctrl</li>
            <li className="middle" id="alt">Alt</li>
            <li className="pointer1st" id="space">Space</li>
            <li className="middle" id="altright">Alt</li>
            <li className="pinky" id="ctrlright">Ctrl</li>

        </ul>
    </div>
  )
}

export default Keyboard
