import { render } from '@testing-library/react';
import Options from '../../components/Options';

describe('<Options />', () => {
  test('renders 3 options', () => {
    const props = {
      highlightedIndex: -1,
      filteredOptions: [
        'test1',
        'test123',
        'test2',
      ],
      handleOptionSelection: jest.fn(),
    }
    const options = render(<Options {...props} />);
    const ul = options.container.querySelector('ul');
    expect(ul.className).toBe('options');
  
    const li = options.container.querySelectorAll('li');  
    expect(li.length).toBe(3);
    expect(li[0].innerHTML).toBe('test1');
    expect(li[1].innerHTML).toBe('test123');
    expect(li[2].innerHTML).toBe('test2');
  });
  
  test('renders empty result', () => {
    const props = {
      highlightedIndex: -1,
      filteredOptions: [],
      handleOptionSelection: jest.fn(),
    }
    const options = render(<Options {...props} />);
    const ul = options.container.querySelectorAll('ul');
    expect(ul.length).toBe(0);
    
    const emptyDiv = options.container.querySelectorAll('div');
    expect(emptyDiv.length).toBe(1);
    expect(emptyDiv[0].className).toBe('empty-options');
    expect(emptyDiv[0].innerHTML).toBe('No options found');
  });

  test('snapshot', () => {
    const props = {
      highlightedIndex: -1,
      filteredOptions: [],
      handleOptionSelection: jest.fn(),
    }
    const options = render(<Options {...props} />);
    expect(options).toMatchSnapshot();
  })
});

