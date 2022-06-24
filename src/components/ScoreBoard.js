import React from 'react'
import "./ScoreBoard.css"

const ScoreBoard = ({score}) => {
  return (
    <div className="score-board">
        Score: {score}
    </div>
  )
}

export default ScoreBoard