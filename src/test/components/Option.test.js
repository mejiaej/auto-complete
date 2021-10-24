import { render } from '@testing-library/react';
import Option from '../../components/Option';

describe('<Option />', () => {
  test('renders one option', () => {
    const props = {
      text: 'text',
      handleOptionSelection: jest.fn(),
    };
    const option = render(<Option {...props} />);
    const li = option.container.querySelectorAll('li');
    expect(li.length).toBe(1);
    expect(li[0].innerHTML).toEqual(props.text);
    li[0].click();
    // check if handleOptionSelection gets called
    expect(props.handleOptionSelection).toBeCalledWith(props.text);
  });

  test('snapshot', () => {
    const props = {
      text: 'text',
      handleOptionSelection: jest.fn(),
    };
    const option = render(<Option {...props} />);
    expect(option).toMatchSnapshot();
  });
});
