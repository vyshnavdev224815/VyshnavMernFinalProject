import axios from 'axios';
import { toast } from 'react-toastify';

// Create an axios instance with default config
const vyshnavApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
vyshnavApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
        return Promise.reject(error);
    }
);

// Book API functions
export const bookApi = {
    // Create a new book
    createBook: async (bookData) => {
        const response = await vyshnavApi.post('/books', bookData);
        if (response.data.success) {
            toast.success('Book added successfully!');
        }
        return response.data;
    },

    // Get all books
    getBooks: async () => {
        const response = await vyshnavApi.get('/books');
        return response.data;
    },

    // Update a book
    updateBook: async (id, bookData) => {
        const response = await vyshnavApi.put(`/books/${id}`, bookData);
        toast.success('Book updated successfully!');
        return response.data;
    },

    // Delete a book
    deleteBook: async (id) => {
        const response = await vyshnavApi.delete(`/books/${id}`);
        toast.success('Book deleted successfully!');
        return response.data;
    }
};

export default vyshnavApi;