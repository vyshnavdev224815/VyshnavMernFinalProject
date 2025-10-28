import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Typography,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const VyshnavBookList = ({ books, onEdit, onDelete }) => {
    return (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
            {books?.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center', my: 3 }}>
                    No books available. Add some books to see them here!
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell><strong>Author</strong></TableCell>
                                <TableCell><strong>Genre</strong></TableCell>
                                <TableCell><strong>Price</strong></TableCell>
                                <TableCell><strong>Stock</strong></TableCell>
                                <TableCell><strong>Published Year</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books?.map((book) => (
                                <TableRow key={book._id}>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>
                                        <Chip label={book.genre} color="primary" variant="outlined" />
                                    </TableCell>
                                    <TableCell>${book.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={book.stock}
                                            color={book.stock === 0 ? "error" : "success"}
                                        />
                                    </TableCell>
                                    <TableCell>{book.publishedYear || 'N/A'}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => onEdit(book)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(book)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default VyshnavBookList;