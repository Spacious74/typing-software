import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar fx'>
        <div className="logo">
        {/* <img width="48" height="48" src="https://img.icons8.com/sf-regular/48/486A94/keyboard.png" className='icon' alt="keyboard"/> */}
        <img src="https://img.icons8.com/external-goofy-color-kerismaker/45/external-Keyboard-computer-hardware-goofy-color-kerismaker.png" alt="external-Keyboard-computer-hardware-goofy-color-kerismaker"/>
        </div>
        <div className="name">Protype</div>
        <div className="subhead">
        Level Up Your Typing Speed
        </div>
    </div>
  )
}

export default Navbar
