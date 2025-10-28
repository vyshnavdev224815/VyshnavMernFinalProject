import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Paper,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Components
import VyshnavAddBookForm from './components/VyshnavAddBookForm';
import VyshnavBookList from './components/VyshnavBookList';
import VyshnavEditBookModal from './components/VyshnavEditBookModal';
import VyshnavDeleteConfirm from './components/VyshnavDeleteConfirm';

// API
import { bookApi } from './services/vyshnavApi';

function App() {
    const [books, setBooks] = useState([]);
    const [stats, setStats] = useState({ total: 0, outOfStock: 0 });
    
    // Fetch books when component mounts
    useEffect(() => {
        fetchBooks();
    }, []);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await bookApi.getBooks();
            if (response.success) {
                setBooks(response.data.books);
                setStats(response.data.stats);
            } else {
                console.error('Failed to fetch books:', response.message);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAdd = async (bookData) => {
        try {
            const response = await bookApi.createBook(bookData);
            if (response.success) {
                await fetchBooks();
                setOpenAdd(false);
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleUpdate = async (id, bookData) => {
        try {
            await bookApi.updateBook(id, bookData);
            fetchBooks();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await bookApi.deleteBook(id);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Vyshnav Book Inventory
                    </Typography>
                    <Button 
                        color="inherit" 
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAdd(true)}
                    >
                        Add Book
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Chip 
                            label={`Total Books: ${stats.total}`}
                            color="primary"
                        />
                        <Chip 
                            label={`Out of Stock: ${stats.outOfStock}`}
                            color="error"
                        />
                    </Box>
                </Paper>

                <VyshnavBookList 
                    books={books}
                    onEdit={(book) => {
                        setSelectedBook(book);
                        setOpenEdit(true);
                    }}
                    onDelete={(book) => {
                        setSelectedBook(book);
                        setOpenDelete(true);
                    }}
                />
            </Container>

            <VyshnavAddBookForm 
                open={openAdd}
                handleClose={() => setOpenAdd(false)}
                handleAdd={handleAdd}
            />

            <VyshnavEditBookModal 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                handleUpdate={handleUpdate}
                book={selectedBook}
            />

            <VyshnavDeleteConfirm 
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                handleDelete={handleDelete}
                book={selectedBook}
            />

            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default App;
