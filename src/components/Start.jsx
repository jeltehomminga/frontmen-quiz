import React, { Component } from "react"
import { navigate } from "gatsby"

class Start extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.props.onNameChange(e.target.value)
  }
  handleSubmit = e => {
    e.preventDefault()
    navigate("/game", {
      state: { name: this.props.userName },
    })
  }
  render() {
    return (
      <div className="container">
        <div id="home" className="flex-center flex-column">
          <h1>
            <span role="img" aria-label="beer-emoji">
              🍺
            </span>{" "}
            Pub Quiz{" "}
            <span role="img" aria-label="beer-emoji">
              🍺
            </span>
          </h1>

          <form className="flex-column" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="input-field"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
              required
            />

            <button
              type="submit"
              className="btn"
              to="/game"
              state={{ name: this.props.userName }}
            >
              Play
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Start
