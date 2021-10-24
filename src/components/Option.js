import { Component } from 'react';

class Option extends Component {
  handleOptionClick = () => {
    const { text, handleOptionSelection } = this.props;
    handleOptionSelection(text);
  };

  render() {
    const { text, handleKeyDown, highlighted } = this.props;
    return (
      <li
        className={`${highlighted ? 'highlighted' : ''}`}
        onClick={this.handleOptionClick}
        onKeyDown={handleKeyDown}
      >
        {text}
      </li>
    );
  }
}

export default Option;
