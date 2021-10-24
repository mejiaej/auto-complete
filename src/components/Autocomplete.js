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
          type="text"
          value={text}
          onChange={this.handleTextChange}
        />
        <Options inputText={text} handleOptionSelection={this.handleOptionSelection} />
      </div>
    );
  }
}

export default Autocomplete;
