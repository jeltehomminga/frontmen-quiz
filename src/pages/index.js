import React, { Component } from "react"
import { Link } from "gatsby"

class Index extends Component {
  state = { name: "" }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.value === "RESET ALL") localStorage.clear()
  }
  render() {
    return (
      <div className="container">
        <div id="home" className="flex-center flex-column">
          <h1>
            <span role="img" aria-label="beer-emoji">
              🍺
            </span>{" "}
            Frontmen Quiz{" "}
            <span role="img" aria-label="beer-emoji">
              🍺
            </span>
          </h1>
          <input
            type="text"
            className="input-field"
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
            required
          />

          <Link type="submit" className="btn" to="/game">
            Play
          </Link>
        </div>
      </div>
    )
  }
}

export default Index
