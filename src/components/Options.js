import { Component } from 'react';
import Option from './Option';

const Empty = () => <div className="empty-options">No options found</div>;

class Options extends Component {
  state = {
    selectedText: null,
    options: [
      'test1',
      'test2',
      'test3',
      'test4',
      'asdasdasd',
      'simply dummy text',
      'typesetting industry',
    ],
    filteredOptions: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputText !== this.props.inputText) {
      this.filterOptions();
    }

    // if user types after selecting an option we need to show options again
    if(prevState.selectedText && this.props.inputText !== prevState.selectedText) {
      this.setState({ selectedText: null });
    }
  }

  filterOptions = async () => {
    const { inputText } = this.props;
    const { options } = this.state;
    // if consuming rest we'll have to await here
    const filteredOptions = options.filter(
      (currentOption) => currentOption.indexOf(inputText) >= 0
    );
    this.setState({ filteredOptions });
  };

  // set internal selected text and call parent callback
  handleOptionSelection = (text) => {
    this.setState({ selectedText: text });
    this.props.handleOptionSelection(text);
  };

  render() {
    const { filteredOptions, selectedText } = this.state;
    const { inputText } = this.props;
    // return null if user selected an option or if text is empty
    if (selectedText || !inputText.trim().length) {
      return null;
    }

    if (!filteredOptions.length) {
      return <Empty />;
    }

    return (
      <ul className="options">
        {filteredOptions.map((option) => (
          <Option
            key={option}
            text={option}
            handleOptionSelection={this.handleOptionSelection}
          />
        ))}
      </ul>
    );
  }
}

export default Options;
