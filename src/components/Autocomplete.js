import { Component } from 'react';
import Options from './Options';

class Autocomplete extends Component {
  state = {
    text: '',
    highlightedIndex: -1,
    showOptions: false,
    options: [
      'test1',
      'test123',
      'test2',
      'test234',
      'test3',
      'test345',
      'test4',
      'test456',
      'asdasdasd',
      'simply dummy text',
      'typesetting industry',
    ],
    filteredOptions: [],
  };

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value,
      showOptions: true,
      highlightedIndex: -1,
    });
  };

  handleOptionSelection = (text) => {
    this.setState({ text, showOptions: false });
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 40) {
      // down arrow key
      // move selector downwards
      this.setState((currentState) => {
        if (currentState.highlightedIndex < currentState.filteredOptions.length - 1) {
          return { highlightedIndex: currentState.highlightedIndex + 1 };
        }
      });
    } else if (event.keyCode === 38) {
      // up arrow key
      // move selector upwards
      this.setState((currentState) => {
        if (currentState.highlightedIndex > -1) {
          return { highlightedIndex: currentState.highlightedIndex - 1 };
        }
      });
    } else if (event.keyCode === 13) {
      // enter arrow key
      this.setState((currentState) => ({
        text: currentState.filteredOptions[currentState.highlightedIndex],
        showOptions: false,
      }));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text !== this.state.text) {
      this.filterOptions();
    }

  }

  filterOptions = async () => {
    const { text } = this.state;
    const { options } = this.state;
    // TODO: perform and await fetch here when switching to REST
    const filteredOptions = options.filter(
      (currentOption) => currentOption.indexOf(text) >= 0
    );
    this.setState({ filteredOptions });
  };

  render() {
    const { text, highlightedIndex, filteredOptions, showOptions } = this.state;

    return (
      <div className="autocomplete-container">
        <label htmlFor="auto-complete">Autocomplete:</label>
        <input
          id="auto-complete"
          className="autocomplete-input"
          type="text"
          value={text}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Insert text here...."
        />
        {showOptions && (
          <Options
            handleOptionSelection={this.handleOptionSelection}
            highlightedIndex={highlightedIndex}
            filteredOptions={filteredOptions}
          />
        )}
      </div>
    );
  }
}

export default Autocomplete;
