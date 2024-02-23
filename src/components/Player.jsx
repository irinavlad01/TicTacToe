import React from 'react'
import { useState } from 'react'

function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing((editing) => !editing);
        //this is how you should update state based on old state
        if(isEditing){
          onChangeName(symbol, playerName);
        }
    }

    let btnCaption = isEditing ? 'Save' : 'Edit';

    const handleChange = (event) => {
      setPlayerName(event.target.value) 
    }

  return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
        {!isEditing ? <span className="player-name">{playerName}</span>
        : <input id="name" required value={playerName} onChange={handleChange}></input>}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{btnCaption}</button>
    </li>
  )
}

export default Player
