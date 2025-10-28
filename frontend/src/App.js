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
            <AppBar position="static" elevation={0} sx={{ 
                backgroundColor: 'white',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ 
                        flexGrow: 1,
                        color: '#1976d2',
                        fontWeight: 600,
                        letterSpacing: '-0.5px'
                    }}>
                        Vyshnav Book Inventory
                    </Typography>
                    <Button 
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAdd(true)}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            px: 3,
                            py: 1
                        }}
                    >
                        Add Book
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ 
                    display: 'flex',
                    gap: 3,
                    mb: 4,
                    justifyContent: 'center'
                }}>
                    <Paper elevation={0} sx={{ 
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        flex: 1,
                        maxWidth: '200px',
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }
                    }}>
                        <Typography variant="h3" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                            {stats.total}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Total Books
                        </Typography>
                    </Paper>

                    <Paper elevation={0} sx={{ 
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        flex: 1,
                        maxWidth: '200px',
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }
                    }}>
                        <Typography variant="h3" color="error" sx={{ mb: 1, fontWeight: 600 }}>
                            {stats.outOfStock}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Out of Stock
                        </Typography>
                    </Paper>
                </Box>

                <Paper elevation={0} sx={{ 
                    p: 3,
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0'
                }}>
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
                </Paper>
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
