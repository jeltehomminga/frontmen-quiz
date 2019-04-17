import React, { Component } from "react"
import "./game.css"
import axios from "axios"

class QuizGame extends Component {
  state = {
    questions: [],
    acceptingAnswers: true,
    score: 0,
    timer: 30,
    questionResult: [],
    questionCounter: 0,
    answerIndex: 0,
  }
  componentWillMount() {
    axios
      .get("https://opentdb.com/api.php?amount=10&encode=url3986")
      .then(response => {
        this.setState({ questions: response.data.results })
        this.shuffleCorrectAnswer()
        this.startTimer()
      })
      .catch(error => {
        console.log(error)
      })
  }
  handleClickAnswer = e => {
    let newScore = this.state.score
    if (e.target.value === this.state.answerIndex) {
      newScore = newScore + 1
    }
    if (this.state.questionCounter < 9) {
      let newQuestionCounter = this.state.questionCounter + 1
      this.setState(
        {
          score: newScore,
          questionCounter: newQuestionCounter,
          timer: 30,
        },
        () => this.shuffleCorrectAnswer()
      )
      this.shuffleCorrectAnswer()
      this.nextQuestion()
    } else {
      this.setState({ score: newScore })
      console.log("End of Game")
      debugger
      this.props.navigate("index")
    }
  }
  nextQuestion = () => {}
  startTimer = () => {
    this.intervalRef = setInterval(() => {
      let newTime = this.state.timer - 1
      this.setState({ timer: newTime })
    }, 1000)
  }
  shuffleCorrectAnswer = () => {
    let currentAnswers = [
      ...this.state.questions[this.state.questionCounter]["incorrect_answers"],
    ]
    let answerIndex = Math.round(Math.random() * currentAnswers.length)
    currentAnswers.splice(
      answerIndex,
      0,
      this.state.questions[this.state.questionCounter]["correct_answer"]
    )
    this.setState({ currentAnswers, answerIndex })
  }
  render() {
    return (
      <div className="container">
        {this.state.questions[this.state.questionCounter] && (
          <div id="game" className="flex-center flex-column">
            <div className="timer">{this.state.timer}</div>
            <h2>
              {unescape(
                this.state.questions[this.state.questionCounter]["question"]
              )}
            </h2>
            {this.state.currentAnswers &&
              this.state.currentAnswers.map((answer, index) => (
                <li
                  className="choice-container"
                  key={`li-answer-${index}`}
                  onClick={e => this.handleClickAnswer(e)}
                  value={index}
                >
                  <p className="choice-prefix">
                    {String.fromCharCode(65 + index)}
                  </p>
                  <p className="choice-text">{unescape(answer)}</p>
                </li>
              ))}
          </div>
        )}
      </div>
    )
  }
}

export default QuizGame
