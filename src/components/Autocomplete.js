import { Component } from 'react';

class Autocomplete extends Component {
  state = {
    text: '',
  };

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    const { text } = this.state;
    return <input
              type="text"
              value={text}
              onChange={this.handleTextChange}
            />;
  }
}

export default Autocomplete;
