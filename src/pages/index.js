import React from "react"
import { Link } from "gatsby"

export default () => {
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
        <Link className="btn" to="/game">
          Play
        </Link>
        <Link className="btn" to="/highscores">
          High Scores
        </Link>
      </div>
    </div>
  )
}
