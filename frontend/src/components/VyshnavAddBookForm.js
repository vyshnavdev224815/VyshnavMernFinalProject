import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const VyshnavAddBookForm = ({ open, handleClose, handleAdd }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        stock: '',
        publishedYear: ''
    });

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd({
            ...book,
            price: Number(book.price),
            stock: Number(book.stock),
            publishedYear: Number(book.publishedYear)
        });
        setBook({ title: '', author: '', genre: '', price: '', stock: '', publishedYear: '' });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Book</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            required
                            label="Title"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label="Author"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                        />
                        <FormControl required>
                            <InputLabel>Genre</InputLabel>
                            <Select
                                name="genre"
                                value={book.genre}
                                label="Genre"
                                onChange={handleChange}
                            >
                                <MenuItem value="Fiction">Fiction</MenuItem>
                                <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            type="number"
                            label="Price"
                            name="price"
                            value={book.price}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            required
                            type="number"
                            label="Stock"
                            name="stock"
                            value={book.stock}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            type="number"
                            label="Published Year"
                            name="publishedYear"
                            value={book.publishedYear}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 1800, max: new Date().getFullYear() } }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Book
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default VyshnavAddBookForm;