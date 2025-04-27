import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CustomerCentre from './Jobs/CustomerCentre';
import { UserProvider } from '../UserContext';
import '@testing-library/jest-dom';

test('navigates to Customer Centre when the card is clicked', () => {
  render(
    <UserProvider> 
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-centre" element={<CustomerCentre />} />
        </Routes>
      </MemoryRouter>
    </UserProvider>
  );

  const card = screen.getByText(/customer centre/i);
  fireEvent.click(card);

  expect(screen.getByText(/my posted jobs/i)).toBeInTheDocument();
});
