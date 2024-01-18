import AddCategoryForm from "src/components/admin/Categories/AddCategoryForm";
import { render } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/react';


describe('AddCategoryForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    it('should render a form with two input fields and a submit button', () => {
      const { getByLabelText, getByRole } = render(<AddCategoryForm />);
  
      const nameInput = getByLabelText('Category Name:');
      const parentInput = getByLabelText('Parent Category:');
      const submitButton = getByRole('button', { name: 'Add Category' });
  
      expect(nameInput).toBeInTheDocument();
      expect(parentInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should allow the user to input a category name and select a parent category', () => {
      const { getByLabelText } = render(<AddCategoryForm />);
  
      const nameInput = getByLabelText('Category Name:');
      const parentInput = getByLabelText('Parent Category:');
  
      expect(nameInput).toBeInTheDocument();
      expect(parentInput).toBeInTheDocument();
    });

    it('should submit the form and send a POST request to save the new category', async () => {
      const { getByLabelText, getByRole } = render(<AddCategoryForm />);
      const mockFetch = jest.fn();
      global.fetch = mockFetch;
  
      const nameInput = getByLabelText('Category Name:');
      const parentInput = getByLabelText('Parent Category:');
      const submitButton = getByRole('button', { name: 'Add Category' });
      
      waitFor(() => {
        fireEvent.change(nameInput, { target: { value: 'Test Category' } });
        fireEvent.change(parentInput, { target: { value: '1' } });
        fireEvent.click(submitButton);
      });
  
      waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/admin/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Category', parentCategoryId: '1' }),
        });
    });
    });

    it('should display an error message when the server returns an error status', async () => {
      const { getByLabelText, getByRole } = render(<AddCategoryForm />);
      const mockFetch = jest.fn().mockRejectedValueOnce({ status: 500 });
      global.fetch = mockFetch;
  
      const nameInput = getByLabelText('Category Name:');
      const parentInput = getByLabelText('Parent Category:');
      const submitButton = getByRole('button', { name: 'Add Category' });
      
      waitFor(() => {
        fireEvent.change(nameInput, { target: { value: 'Test Category' } });
        fireEvent.change(parentInput, { target: { value: '1' } });
        fireEvent.click(submitButton);
      });
    
      waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/admin/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Category', parentCategoryId: '1' }),
        });
        expect(alert).toHaveBeenCalledWith('Error saving new category, status: 500');
      });
    });

    it('should handle null or undefined values for parentCategoryId', async () => {
        const { getByLabelText, getByRole } = render(<AddCategoryForm />);
        const mockFetch = jest.fn();
        global.fetch = mockFetch;
  
        const nameInput = getByLabelText('Category Name:');
        const parentInput = getByLabelText('Parent Category:');
        const submitButton = getByRole('button', { name: 'Add Category' });
        
        waitFor(() => {
            fireEvent.change(nameInput, { target: { value: 'Test Category' } });
            fireEvent.change(parentInput, { target: { value: '' } });
            fireEvent.click(submitButton);
        });
    
        waitFor(() => {      
            expect(mockFetch).toHaveBeenCalledWith('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Test Category', parentCategoryId: '' }),
            });
        });
    });

    it('should handle empty response from the server', async () => {
        const { getByLabelText, getByRole } = render(<AddCategoryForm />);
        const mockFetch = jest.fn().mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(null) });
        global.fetch = mockFetch;

        const nameInput = getByLabelText('Category Name:');
        const parentInput = getByLabelText('Parent Category:');
        const submitButton = getByRole('button', { name: 'Add Category' });

        waitFor(() => {
        fireEvent.change(nameInput, { target: { value: 'Test Category' } });
        fireEvent.change(parentInput, { target: { value: '1' } });
        fireEvent.click(submitButton);
        });

        waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Test Category', parentCategoryId: '1' }),
            });
            expect(alert).toHaveBeenCalledWith('Category saved successfully!');
            expect(onSuccess).toHaveBeenCalled();
        });
    });
});
