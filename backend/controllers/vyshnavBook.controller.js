const VyshnavBook = require('../models/vyshnavBook.model');

// POST /api/books - Add a new book
const createBook = async (req, res) => {
    try {
        const newBook = new VyshnavBook(req.body);
        const validationError = newBook.validateSync();
        
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: Object.values(validationError.errors).map(err => err.message)
            });
        }

        const savedBook = await newBook.save();
        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: savedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding book',
            error: error.message
        });
    }
};

// GET /api/books - List all books
const listBooks = async (req, res) => {
    try {
        const books = await VyshnavBook.find()
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .select('-__v'); // Exclude version field
        
        const totalBooks = await VyshnavBook.countDocuments();
        const outOfStock = await VyshnavBook.countDocuments({ stock: 0 });

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: {
                books,
                stats: {
                    total: totalBooks,
                    outOfStock
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving books',
            error: error.message
        });
    }
};

// PUT /api/books/:id - Update a book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if book exists
        const book = await VyshnavBook.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book with ID ${id} not found`
            });
        }

        // Update book with new values
        const updatedBook = await VyshnavBook.findByIdAndUpdate(
            id,
            { 
                ...req.body,
                updatedAt: new Date() 
            },
            { 
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        // Handle specific MongoDB validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating book',
            error: error.message
        });
    }
};

// DELETE /api/books/:id - Delete a book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if book exists
        const book = await VyshnavBook.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book with ID ${id} not found`
            });
        }

        // Delete the book
        await VyshnavBook.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: {
                deletedBook: book,
                remainingBooks: await VyshnavBook.countDocuments()
            }
        });
    } catch (error) {
        // Handle invalid ObjectId format
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error: error.message
        });
    }
};

module.exports = {
    createBook,
    listBooks,
    updateBook,
    deleteBook
};