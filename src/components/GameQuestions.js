import React from "react"

const GameQuestions = props => {
  const handleClickAnswer = e => props.handleClickAnswer(e)
  return (
    <>
      <div className="timer" value={props.timer}>
        {props.timer}
      </div>
      <h2>{unescape(props.questions[props.questionCounter]["question"])}</h2>
      {props.currentAnswers &&
        props.currentAnswers.map((answer, index) => (
          <li
            value={index}
            className="choice-container"
            key={`li-answer-${index}`}
            onClick={e => handleClickAnswer(e)}
          >
            <p
              className="choice-prefix"
              value={index}
              onClick={e => handleClickAnswer(e)}
            >
              {String.fromCharCode(65 + index)}
            </p>
            <p
              value={index}
              className="choice-text"
              onClick={e => handleClickAnswer(e)}
            >
              {unescape(answer)}
            </p>
          </li>
        ))}
    </>
  )
}

export default GameQuestions
