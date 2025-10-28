const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { createBook, listBooks, updateBook, deleteBook } = require('../controllers/vyshnavBook.controller');

// Validation middleware for POST /api/books
const validateBook = [
    body('title').trim().notEmpty().withMessage('Book title is required'),
    body('author').trim().notEmpty().withMessage('Author name is required'),
    body('genre').trim().notEmpty().withMessage('Genre is required'),
    body('price').isNumeric().withMessage('Price must be a number')
        .custom(value => value >= 0).withMessage('Price cannot be negative'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be zero or positive'),
    body('publishedYear').optional().isInt()
        .custom(value => {
            const currentYear = new Date().getFullYear();
            return value >= 1800 && value <= currentYear;
        }).withMessage(`Published year must be between 1800 and ${new Date().getFullYear()}`)
];

// Validation middleware for PUT /api/books/:id
const validateUpdate = [
    body('title').optional().trim().notEmpty().withMessage('Book title cannot be empty'),
    body('author').optional().trim().notEmpty().withMessage('Author name cannot be empty'),
    body('genre').optional().trim().notEmpty().withMessage('Genre cannot be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number')
        .custom(value => value >= 0).withMessage('Price cannot be negative'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be zero or positive'),
    body('publishedYear').optional().isInt()
        .custom(value => {
            const currentYear = new Date().getFullYear();
            return value >= 1800 && value <= currentYear;
        }).withMessage(`Published year must be between 1800 and ${new Date().getFullYear()}`)
];

// GET /api/books - List all books
router.get('/', listBooks);

// POST /api/books - Add a new book
router.post('/', validateBook, createBook);

// PUT /api/books/:id - Update a book
router.put('/:id', validateUpdate, updateBook);

// DELETE /api/books/:id - Delete a book
router.delete('/:id', [
    param('id').notEmpty().withMessage('Book ID is required')
], deleteBook);

module.exports = router;
