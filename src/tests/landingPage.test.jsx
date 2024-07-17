import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';

// Mock the Outlet component from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet" />,
}));

describe('LandingPage', () => {
  const renderWithRouter = (initialEntries) => render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </MemoryRouter>,
  );

  it('renders the sidebar and main content', () => {
    renderWithRouter(['/']);
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('link-resume')).toBeInTheDocument();
    expect(screen.getByTestId('link-cover-letter')).toBeInTheDocument();
    expect(screen.getByTestId('link-transcribe')).toBeInTheDocument();
    expect(screen.getByTestId('link-image-creation')).toBeInTheDocument();
  });

  it('hides additional content on specific paths', () => {
    const hideContentPaths = ['/resume', '/cover-letter', '/transcribe', '/image-creation'];
    hideContentPaths.forEach((path) => {
      renderWithRouter([path]);
      expect(screen.queryByTestId('intro')).not.toBeInTheDocument();
      expect(screen.queryByTestId('instructions')).not.toBeInTheDocument();
    });
  });

  it('shows additional content on other paths', () => {
    renderWithRouter(['/']);
    expect(screen.getByTestId('intro')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });
});
