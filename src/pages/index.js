import React, { Component } from "react"
import Start from '../components/Start'


class Index extends Component {
  state = { name: "" }
  handleChange = e => {
    this.setState({ name: e})
    if (e === "RESET ALL") localStorage.clear()
  }
  render() {
    return (
  <Start onNameChange={this.handleChange} userName={this.state.name}/>
    )
  }
}

export default Index
