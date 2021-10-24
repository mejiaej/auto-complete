import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../../components/Autocomplete';

describe('<Autocomplete />', () => {
  test('renders two options', () => {
    render(<Autocomplete />);
    const input = screen.getByLabelText('Autocomplete:');
    userEvent.type(input, 'test4');
    const firstOption = screen.getAllByText('test4');
    const secondOption = screen.getAllByText('test456');
    expect(firstOption.length).toBe(1);
    expect(secondOption.length).toBe(1);
  
    // click on second option
    secondOption[0].click();
  
    expect(screen.getByDisplayValue('test456').id).toBe('auto-complete');
  
    // options should disapear after selection one
    expect(screen.queryByText('test4')).not.toBeInTheDocument();
    expect(screen.queryByText('test456')).not.toBeInTheDocument();
  
    expect(input.getAttribute('value')).toBe('test456');
  });
  
  test('renders no option', () => {
    render(<Autocomplete />);
    const input = screen.getByLabelText('Autocomplete:');
    userEvent.type(input, 'no-options');
    const emptyContainer = screen.queryByText('No options found');
    expect(emptyContainer.className).toBe('empty-options');
  });
  
  test('select option with keyboard', () => {
    render(<Autocomplete />);
    const input = screen.getByLabelText('Autocomplete:');
    userEvent.type(input, 'test4');
    const firstOption = screen.getAllByText('test4');
    const secondOption = screen.getAllByText('test456');
    expect(firstOption.length).toBe(1);
    expect(secondOption.length).toBe(1);
  
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 40, charCode: 40, keyCode: 40 });
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 40, charCode: 40, keyCode: 40 });
  
    expect(screen.queryByText('test456').className).toBe('highlighted');
  
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13, keyCode: 13 });
    // options should disapear after selection
    expect(screen.queryByText('test4')).not.toBeInTheDocument();
    expect(screen.queryByText('test456')).not.toBeInTheDocument();
    expect(input.getAttribute('value')).toBe('test456');
  });

  test('snapshot', () => {
    const autocomplete = render(<Autocomplete />);
    expect(autocomplete).toMatchSnapshot();
  });
});

