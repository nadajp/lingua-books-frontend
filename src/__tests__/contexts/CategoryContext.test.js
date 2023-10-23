import { render, screen } from '@testing-library/react';
import { CategoriesProvider, useCategories } from '../../contexts/CategoryContext'

jest.mock('../../hooks/useFetch');

function TestComponent() {
  const { categories, isLoading, isError } = useCategories();
  
  return (
    <div>
      {isLoading && <span>loading</span>}
      {isError && <span>error</span>}
      <ul>{categories.map(cat => <li key={cat.id}>{cat.name}</li>)}</ul>
    </div>
  );
}

test('provides categories when data is loaded', () => {
  require('../../hooks/useFetch').default.mockReturnValue({
    data: [{ id: '1', name: 'Category 1' }],
    isLoading: false,
    isError: false
  });

  render(
    <CategoriesProvider>
      <TestComponent />
    </CategoriesProvider>
  );

  expect(screen.getByText('Category 1')).toBeInTheDocument();
});

test('indicates loading when data is loading', () => {
  require('../../hooks/useFetch').default.mockReturnValue({
    data: [],
    isLoading: true,
    isError: false
  });

  render(
    <CategoriesProvider>
      <TestComponent />
    </CategoriesProvider>
  );

  expect(screen.getByText('loading')).toBeInTheDocument();
});


test('indicates error when data is loading', () => {
  require('../../hooks/useFetch').default.mockReturnValue({
    data: [],
    isLoading: false,
    isError: true
  });

  render(
    <CategoriesProvider>
      <TestComponent />
    </CategoriesProvider>
  );

  expect(screen.getByText('error')).toBeInTheDocument();
});
