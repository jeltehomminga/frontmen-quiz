import React from 'react';

const UserResult = props => {
    const handleClick = (e) => {
        debugger
        props.handleClickNavigate(e);
    }
  return (
    <div>
      <h2 style={{ maxWidth: "100%" }}>Your Result</h2>
      <div className="score">
        <span>Score: </span>
        {props.userResults[props.userResults.length - 1]["score"]}
      </div>
      <div className="score">
        <span>Correct Answers: </span>
        {
          props.userResults[props.userResults.length - 1][
            "correctAnswers"
          ]
        }
      </div>
      <div
        className="btn "
        value="NewGame"
        onClick={e => handleClick(e)}
      >
        New Game
      </div>
      <div
        className="btn "
        value="HighScore"
        onClick={e => handleClick(e)}
      >
        High Scores
      </div>
    </div>
  )
}

export default UserResult;
