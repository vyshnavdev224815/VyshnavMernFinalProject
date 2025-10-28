const mongoose = require('mongoose');

const vyshnavBookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Book title is required'],
        trim: true 
    },
    author: { 
        type: String, 
        required: [true, 'Author name is required'],
        trim: true 
    },
    genre: { 
        type: String, 
        required: [true, 'Genre is required'],
        trim: true 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'] 
    },
    stock: { 
        type: Number, 
        default: 0,
        min: [0, 'Stock cannot be negative'] 
    },
    publishedYear: { 
        type: Number,
        min: [1800, 'Published year must be after 1800'],
        max: [new Date().getFullYear(), 'Published year cannot be in the future'] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const VyshnavBook = mongoose.model('VyshnavBook', vyshnavBookSchema);
module.exports = VyshnavBook;