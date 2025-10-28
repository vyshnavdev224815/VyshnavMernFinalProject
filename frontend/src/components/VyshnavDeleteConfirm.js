import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

const VyshnavDeleteConfirm = ({ open, handleClose, handleDelete, book }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete the book "{book?.title}" by {book?.author}?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button 
                    onClick={() => {
                        handleDelete(book?._id);
                        handleClose();
                    }} 
                    color="error" 
                    variant="contained"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VyshnavDeleteConfirm;