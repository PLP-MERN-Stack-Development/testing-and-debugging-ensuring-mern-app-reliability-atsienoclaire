import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugForm from '../../components/BugForm';
import axios from 'axios';

jest.mock('axios');

describe('BugForm', () => {
  it('renders form inputs and submit button', () => {
    render(<BugForm onBugCreated={jest.fn()} />);
    expect(screen.getByPlaceholderText(/Bug title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Report Bug/i })).toBeInTheDocument();
  });

  it('shows error if title is empty', () => {
    render(<BugForm onBugCreated={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Report Bug/i }));
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
  });

  it('calls API and onBugCreated when valid', async () => {
    const newBug = { _id: '1', title: 'Test Bug', status: 'open' };
    axios.post.mockResolvedValueOnce({ data: newBug });
    const onBugCreated = jest.fn();

    render(<BugForm onBugCreated={onBugCreated} />);
    fireEvent.change(screen.getByPlaceholderText(/Bug title/i), { target: { value: 'Test Bug' } });
    fireEvent.click(screen.getByRole('button', { name: /Report Bug/i }));

    // Wait for axios call
    await screen.findByDisplayValue('');
    expect(onBugCreated).toHaveBeenCalledWith(newBug);
  });
});
