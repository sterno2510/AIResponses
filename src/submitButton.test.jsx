import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('renders the button with children', () => {
    render(<SubmitButton loading={false} type="submit">Submit</SubmitButton>);
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submit');
  });

  it('disables the button when loading', () => {
    render(<SubmitButton loading type="submit">Submit</SubmitButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(<SubmitButton loading type="submit">Submit</SubmitButton>);
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('spinner'));
  });

  it('calls onClick handler when button is clicked', () => {
    const onClick = jest.fn();
    render(<SubmitButton loading={false} type="submit" onClick={onClick}>Submit</SubmitButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
