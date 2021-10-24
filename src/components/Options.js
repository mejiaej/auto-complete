import { Component } from 'react';
import Option from './Option';

const Empty = () => <div className="empty-options">No options found</div>;

class Options extends Component {
  shouldHighlightOption = (index) => {
    return index === this.props.highlightedIndex;
  }

  render() {
    const { filteredOptions, handleOptionSelection } = this.props;

    if (!filteredOptions.length) {
      return <Empty />;
    }

    return (
      <ul className="options">
        {filteredOptions.map((option, currentIndex) => (
          <Option
            key={option}
            text={option}
            handleOptionSelection={handleOptionSelection}
            highlighted={this.shouldHighlightOption(currentIndex)}
          />
        ))}
      </ul>
    );
  }
}

export default Options;
