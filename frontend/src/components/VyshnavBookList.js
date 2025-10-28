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
                <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    color: 'text.secondary'
                }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        No books available
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Add some books to see them here!
                    </Typography>
                </Box>
            ) : (
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Author</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Genre</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Stock</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Published</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books?.map((book) => (
                                <TableRow 
                                    key={book._id}
                                    sx={{
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                            {book.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={book.genre} 
                                            color="primary" 
                                            variant="outlined"
                                            size="small"
                                            sx={{ borderRadius: '6px' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            ${book.price.toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={book.stock}
                                            color={book.stock === 0 ? "error" : "success"}
                                            size="small"
                                            sx={{ 
                                                borderRadius: '6px',
                                                backgroundColor: book.stock === 0 ? 'rgba(211, 47, 47, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                                                color: book.stock === 0 ? 'error.main' : 'success.main',
                                                border: 'none'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {book.publishedYear || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton 
                                            onClick={() => onEdit(book)} 
                                            color="primary"
                                            size="small"
                                            sx={{ 
                                                mr: 1,
                                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.2)'
                                                }
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton 
                                            onClick={() => onDelete(book)} 
                                            color="error"
                                            size="small"
                                            sx={{ 
                                                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(211, 47, 47, 0.2)'
                                                }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
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