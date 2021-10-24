import { Component } from "react";

class Option extends Component {
  
  handleOptionClick = () => {
    const { text, handleOptionSelection } = this.props;
    handleOptionSelection(text);
  }

  render() {
    const { text } = this.props;
    return (
      <li onClick={this.handleOptionClick}>
        {text}
      </li>
    );
  }
}

export default Option;
