import { render } from '@testing-library/react';
import Options from '../components/Options';

test('renders two options after text prop changes to test1', () => {
  const props = {
    inputText: '',
    handleOptionSelection: jest.fn(),
  }
  const options = render(<Options {...props} />);
  options.rerender(<Options {...{...props, inputText: 'test1'}} />);
  const ul = options.container.querySelector('ul');
  expect(ul.className).toBe('options');

  const li = options.container.querySelectorAll('li');  
  expect(li.length).toBe(2);
  expect(li[0].innerHTML).toBe('test1');
  expect(li[1].innerHTML).toBe('test123');
});

test('renders empty result', () => {
  const props = {
    inputText: '',
    handleOptionSelection: jest.fn(),
  }
  const options = render(<Options {...props} />);
  options.rerender(<Options {...{...props, inputText: 'testing-text'}} />);
  const ul = options.container.querySelectorAll('ul');
  expect(ul.length).toBe(0);
  
  const emptyDiv = options.container.querySelectorAll('div');
  expect(emptyDiv.length).toBe(1);
  expect(emptyDiv[0].className).toBe('empty-options');
  expect(emptyDiv[0].innerHTML).toBe('No options found');
});
