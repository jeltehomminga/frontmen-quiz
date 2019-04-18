import React from "react"
import { Link } from "gatsby"

const HighScores = props => {
  return (
    <>
      <h1>high scores</h1>
      {props.highScoreArray.length > 0 ? (
        <div className="top3">
          {props.highScoreArray.map((highScore, index) => (
            <div className="high-score" key={`high-score-${index}`}>
              <div className="high-score-item">
                <span>Score: </span>
                <span>{highScore.score}</span>
              </div>
              <div className="high-score-item">
                <span>Correct: </span>
                <span>{highScore.correctAnswers}</span>
              </div>
              <div className="high-score-item">
                <span>{highScore.name}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>Not enough scores yet</h2>
      )}
      <Link className="btn" to="/">
        New Game
      </Link>
    </>
  )
}

export default HighScores