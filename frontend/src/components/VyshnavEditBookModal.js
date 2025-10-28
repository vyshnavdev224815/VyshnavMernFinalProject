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

const VyshnavEditBookModal = ({ open, handleClose, handleUpdate, book }) => {
    const [editedBook, setEditedBook] = useState(book || {});

    React.useEffect(() => {
        setEditedBook(book || {});
    }, [book]);

    const handleChange = (e) => {
        setEditedBook({
            ...editedBook,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(editedBook._id, {
            ...editedBook,
            price: Number(editedBook.price),
            stock: Number(editedBook.stock),
            publishedYear: Number(editedBook.publishedYear)
        });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Book</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            required
                            label="Title"
                            name="title"
                            value={editedBook.title || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label="Author"
                            name="author"
                            value={editedBook.author || ''}
                            onChange={handleChange}
                        />
                        <FormControl required>
                            <InputLabel>Genre</InputLabel>
                            <Select
                                name="genre"
                                value={editedBook.genre || ''}
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
                            value={editedBook.price || ''}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            required
                            type="number"
                            label="Stock"
                            name="stock"
                            value={editedBook.stock || ''}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            type="number"
                            label="Published Year"
                            name="publishedYear"
                            value={editedBook.publishedYear || ''}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 1800, max: new Date().getFullYear() } }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Update Book
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default VyshnavEditBookModal;