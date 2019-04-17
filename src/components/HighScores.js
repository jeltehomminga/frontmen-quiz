import React from "react"
import { Link } from "gatsby"

const HighScores = props => {
  return (
    <>
      <h1>high scores</h1>
      {props.highScoreArray.length > 2 ? (
        <div className="top3">
          <div className="high-score" key="high-score-1">
            <span>Score: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 1][
                "score"
              ]
            }
            <span>Correct: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 1][
                "correctAnswers"
              ]
            }
            <span>Name: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 1][
                "name"
              ]
            }
          </div>
          <div className="high-score" key="high-score-2">
            <span>Score: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 2][
                "score"
              ]
            }
            <span>Correct: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 2][
                "correctAnswers"
              ]
            }
            <span>Name: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 2][
                "name"
              ]
            }
          </div>
          <div className="high-score" key="high-score-3">
            <span>Score: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 3][
                "score"
              ]
            }
            <span>Correct: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 3][
                "correctAnswers"
              ]
            }
            <span>Name: </span>
            {
              props.highScoreArray[props.highScoreArray.length - 3][
                "name"
              ]
            }
          </div>
        </div>
      ) : (
        <h2>Not enough scores yet</h2>
      )}
      {/* <div
        className="btn "
        value="NewGame"
        onClick={e => handleClickNavigate(e)}
      >
        New Game
      </div> */}
      <Link  className="btn" to="/" >
            New Game
          </Link>
    </>
  )
}

export default HighScores
