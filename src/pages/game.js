import React, { Component } from "react"
import "./game.css"
import questions from "../data/questions.json"

class QuizGame extends Component {
  render() {
    return (
      <div className="container">
        <div id="game" className="flex-center flex-column">
          <h2 id="question">What is the answer?</h2>
          <div className="choice-container">
            <p className="choice-prefix">A</p>
            <p className="choice-text" data-number="1">
              Choice 1
            </p>
          </div>
          <div className="choice-container">
            <p className="choice-prefix">B</p>
            <p className="choice-text" data-number="2">
              Choice 2
            </p>
          </div>
          <div className="choice-container">
            <p className="choice-prefix">C</p>
            <p className="choice-text" data-number="3">
              Choice 3
            </p>
          </div>
          <div className="choice-container">
            <p className="choice-prefix">D</p>
            <p className="choice-text" data-number="4">
              Choice 4
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default QuizGame
