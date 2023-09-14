import React from 'react';
import { render, act, screen } from '@testing-library/react';
import fetchData from '../../services/fetchData';
import { CategoriesProvider, useCategories } from './path-to-your-file';

// Mock fetchData service
jest.mock('fetchData', () => jest.fn());

function TestComponent() {
  const categories = useCategories();
  return (
    <div>
      {categories.map((category, idx) => (
        <span key={idx}>{category}</span>
      ))}
    </div>
  );
}

describe('CategoriesContext', () => {
  test('provides categories data to child components', async () => {
    const mockCategories = ['category1', 'category2', 'category3'];

    fetchData.mockResolvedValue(mockCategories);

    await act(async () => {
      render(
        <CategoriesProvider>
          <TestComponent />
        </CategoriesProvider>
      );
    });

    expect(screen.getByText('category1')).toBeInTheDocument();
    expect(screen.getByText('category2')).toBeInTheDocument();
    expect(screen.getByText('category3')).toBeInTheDocument();
  });

  test('handles fetchData errors gracefully', async () => {
    fetchData.mockRejectedValue(new Error('Failed to fetch'));

    console.error = jest.fn(); // Suppress expected console error

    await act(async () => {
      render(
        <CategoriesProvider>
          <TestComponent />
        </CategoriesProvider>
      );
    });

    // Here, you can check for the absence of categories or presence of any error messages you might show
    expect(screen.queryByText('category1')).not.toBeInTheDocument();
  });
});
