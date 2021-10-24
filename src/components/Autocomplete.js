import { Component } from 'react';
import Options from './Options';

class Autocomplete extends Component {
  state = {
    text: '',
  };

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleOptionSelection = (text) => {
    this.setState({ text });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="autocomplete-container">
        <input
          className="autocomplete-input"
          type="text"
          value={text}
          onChange={this.handleTextChange}
          placeholder="Insert text here...."
        />
        <Options inputText={text} handleOptionSelection={this.handleOptionSelection} />
      </div>
    );
  }
}

export default Autocomplete;
