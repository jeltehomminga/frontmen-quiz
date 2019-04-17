import React, { Component } from "react"
import "./game.css"
import axios from "axios"

class QuizGame extends Component {
  state = {
    questions: [],
    score: 0,
    correctAnswers: 0,
    timer: 30,
    userResults: [],
    questionCounter: 0,
    answerIndex: 0,
    result: false,
    highScores: false,
    highScoreArray: [],
  }
  componentWillMount() {
    axios
      .get("https://opentdb.com/api.php?amount=10&encode=url3986")
      .then(response => {
        for (let key in this.state) {
          if (localStorage.hasOwnProperty(key)) {
            let value = localStorage.getItem(key)
            try {
              debugger
              value = JSON.parse(value)
              this.setState({ [key]: value })
            } catch (e) {
              this.setState({ [key]: value })
            }
          }
        }

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
    let newCorrectAnswers = this.state.correctAnswers
    if (
      e.target.value === this.state.answerIndex ||
      e.target.parentElement.parentElement.value === this.state.answerIndex ||
      e.target.parentElement.value === this.state.answerIndex
    ) {
      newScore += 50 + this.state.timer
      newCorrectAnswers += 1
    }
    if (this.state.questionCounter < 9) {
      let newQuestionCounter = this.state.questionCounter + 1
      this.setState(
        {
          score: newScore,
          correctAnswers: newCorrectAnswers,
          questionCounter: newQuestionCounter,
          timer: 30,
        },
        () => this.shuffleCorrectAnswer()
      )
    } else {
      const userResult = {
        name: "",
        score: newScore,
        correctAnswers: this.state.correctAnswers,
      }
      let newUserResults = [...this.state.userResults, { ...userResult }]
      this.setState({
        score: newScore,
        result: true,
        userResults: newUserResults,
      })
      debugger
      localStorage.setItem("userResults", JSON.stringify(newUserResults))
      clearInterval(this.intervalRef)
      console.log("End of Game")
      //   this.props.navigate("/")
    }
  }
  nextQuestion = () => {
    if (this.state.questionCounter < 9) {
      let newQuestionCounter = this.state.questionCounter + 1
      this.setState(
        {
          questionCounter: newQuestionCounter,
          timer: 30,
        },
        () => this.shuffleCorrectAnswer()
      )
    } else {
      const userResult = {
        name: "",
        score: this.state.score,
        correctAnswers: this.state.correctAnswers,
      }
      let newUserResults = [...this.state.userResults, { ...userResult }]
      this.setState({
        result: true,
        userResults: newUserResults,
      })
      debugger
      localStorage.setItem("userResults", JSON.stringify(newUserResults))
      clearInterval(this.intervalRef)
      console.log("End of Game")
    }
  }
  startTimer = () => {
    this.intervalRef = setInterval(() => {
      let newTime = this.state.timer - 1
      if (newTime < 1) {
        newTime = 30
        this.nextQuestion()
      }
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
  handleClickNavigate = e => {
    debugger
    if (e.target.innerText === "New Game") {
      this.props.navigate("/")
    } else if (e.target.innerText === "High Scores") {
      let newResult = false
      let newHighScores = true
      let highScoreArray = this.state.userResults.sort((a, b) =>
        a.score > b.score ? 1 : -1
      )
      debugger
      console.log(highScoreArray)
      this.setState({
        result: newResult,
        highScores: newHighScores,
        highScoreArray: highScoreArray,
      })
    }
  }
  render() {
    return (
      <>
        <div className="container">
          {this.state.questions[this.state.questionCounter] && (
            <div id="game" className="flex-center flex-column">
              {this.state.result && this.state.result === true ? (
                <div>
                  <h2 style={{ maxWidth: "100%" }}>Your Result</h2>
                  <div className="score">
                    <span>Score: </span>
                    {
                      this.state.userResults[this.state.userResults.length - 1][
                        "score"
                      ]
                    }
                  </div>
                  <div className="score">
                    <span>Correct Answers: </span>
                    {
                      this.state.userResults[this.state.userResults.length - 1][
                        "correctAnswers"
                      ]
                    }
                  </div>

                  <div
                    className="btn "
                    value="NewGame"
                    onClick={e => this.handleClickNavigate(e)}
                  >
                    New Game
                  </div>
                  <div
                    className="btn "
                    value="HighScore"
                    onClick={e => this.handleClickNavigate(e)}
                  >
                    High Scores
                  </div>
                </div>
              ) : (
                <>
                  {this.state.highScores &&
                  this.state.highScores === true &&
                  this.state.highScoreArray.length > 2 ? (
                    <>
                      <h1>high scores</h1>
                      <div className="top3">
                        <div className="high-score" key="high-score-1">
                          <span>Score: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 1
                            ]["score"]
                          }
                          <span>Correct: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 1
                            ]["correctAnswers"]
                          }
                          <span>Name: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 1
                            ]["name"]
                          }
                        </div>
                        <div className="high-score" key="high-score-2">
                          <span>Score: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 2
                            ]["score"]
                          }
                          <span>Correct: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 2
                            ]["correctAnswers"]
                          }
                          <span>Name: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 2
                            ]["name"]
                          }
                        </div>
                        <div className="high-score" key="high-score-3">
                          <span>Score: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 3
                            ]["score"]
                          }
                          <span>Correct: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 3
                            ]["correctAnswers"]
                          }
                          <span>Name: </span>
                          {
                            this.state.highScoreArray[
                              this.state.highScoreArray.length - 3
                            ]["name"]
                          }
                        </div>
                      </div>
                      <div
                        className="btn "
                        value="NewGame"
                        onClick={e => this.handleClickNavigate(e)}
                      >
                        New Game
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="timer"
                        onChange={this.handleTimerChange}
                        value={this.state.timer}
                      >
                        {this.state.timer}
                      </div>
                      <h2>
                        {unescape(
                          this.state.questions[this.state.questionCounter][
                            "question"
                          ]
                        )}
                      </h2>
                      {this.state.currentAnswers &&
                        this.state.currentAnswers.map((answer, index) => (
                          <li
                            value={index}
                            className="choice-container"
                            key={`li-answer-${index}`}
                            onClick={e => this.handleClickAnswer(e)}
                          >
                            <p
                              className="choice-prefix"
                              value={index}
                              onClick={e => this.handleClickAnswer(e)}
                            >
                              {String.fromCharCode(65 + index)}
                            </p>
                            <p
                              value={index}
                              className="choice-text"
                              onClick={e => this.handleClickAnswer(e)}
                            >
                              {unescape(answer)}
                            </p>
                          </li>
                        ))}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default QuizGame
