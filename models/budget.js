/*  File name : budget
    Author's name : Noah Michael
    Website name : Budget Manager
    File description : This file defines the schema and is a .js type
 */

// Link to mongoose
var mongoose = require('mongoose');

// Defining a schema for the Budget model which allows this and all other models inherit from mongoose.Schema
var budgetSchema = new mongoose.Schema({
    itemPurchased: {
        type: String,
        required: 'Please enter the item purchased'
    },
    quantityPurchased: {
        type: Number,
        required: 'Please choose a quantity'
    },
    price: {
        type: Number,
        required: 'Please enter the price'
    }
});

// Make this file public
module.exports = mongoose.model('Budget', budgetSchema);