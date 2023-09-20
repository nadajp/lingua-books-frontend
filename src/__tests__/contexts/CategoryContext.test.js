import React from 'react';
import { render, act, screen } from '@testing-library/react';
import fetchData from '../../services/fetchData';
import { CategoriesProvider, useCategories } from '../../contexts/CategoryContext';

jest.mock('../../services/fetchData', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(),
}));


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
});
