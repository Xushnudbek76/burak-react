// @ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({
      brand: "Tesla",
      model: "Model S",
      color: "blue",
      year: 2023,
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    // Runs after first render => can fetch data from backend server here
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // Runs before component is removed
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", prevState, this.state);
    // Runs after state or props update
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model} from {this.state.year}
        </p>
        <button type="button" onClick={this.changeDetail}>Change Details</button>
      </div>
    );
  }
}

export default Test;