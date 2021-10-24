import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../components/Autocomplete';

test('renders two options', () => {
  render(<Autocomplete />);
  const input = screen.getByLabelText('Autocomplete:');
  userEvent.type(input, 'test4');
  const firstOption = screen.getAllByText('test4');
  const secondOption = screen.getAllByText('test456');
  expect(firstOption.length).toBe(1);
  expect(secondOption.length).toBe(1);

  secondOption[0].click();

  expect(screen.getByDisplayValue('test456').id).toBe('auto-complete');

  // options should disapear after selection one
  expect(screen.queryByText('test4')).not.toBeInTheDocument()
  expect(screen.queryByText('test456')).not.toBeInTheDocument()

});

test('renders no option', () => {
  render(<Autocomplete />);
  const input = screen.getByLabelText('Autocomplete:');
  userEvent.type(input, 'no-options');
  const emptyContainer = screen.queryByText('No options found');
  expect(emptyContainer.className).toBe('empty-options');
});
