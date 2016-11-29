/*  File name : budgetManager
    Author's name : Noah Michael
    Website name : Budget Manager
    File description : This file contains the GET and POST handlers for the CRUD operations and is a .js type
 */

var express = require('express');
var router = express.Router();

// Link to the Budget model
var Budget = require('../models/budget');

// Authentication for when a user is logged in
function isLoggedIn(req, res,next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

/* GET the home page */
router.get('/', isLoggedIn, function(req, res, next) {
    // Budget model used to query the Database for budget data
    Budget.find(function(err, budgetManager) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // Loads the budgetManager page and passes the query result
            res.render('budgetManager', {
                title: 'Current Budget',
                budgetManager: budgetManager,
                user: req.user
            });
        }
    });
});

/* GET /budgetManager/add - Process add */
router.get('/add', isLoggedIn, function(req, res, next) {
    res.render('add-item', {
        title: 'Add a New Item',
        user: req.user
    });
});

/* POST /budgetManager/add - Processes the form submission */
router.post('/add', isLoggedIn, function(req, res, next) {

    // Gets the form inputs and uses mongoose to insert to the database
    Budget.create( {
        itemPurchased: req.body.itemPurchased,
        quantityPurchased: req.body.quantityPurchased,
        price: req.body.price
    }, function(err, budgetManager) {
        if (err) {
            console.log(err);
            res.render('error', { message: 'Could not add Item'} );
        }
        else {
            res.redirect('/budgetManager');
        }
    });
});

/* GET /budgetManager/delete/_id - Processes delete */
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {

    // Gets the ID from the URL
    var _id = req.params._id;

    // Delete the document with this _id
    Budget.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Delete Item',
                error: err
            });
        }
        else {
            res.redirect('/budgetManager');
        }
    });
});

/* GET /budgetManager/_id - Display the edit page and populates it with values */
router.get('/:_id', isLoggedIn, function(req, res, next) {

    // Gets the ID from the URL
    var _id = req.params._id;

    // Uses Mongoose to get the selected budget document
    Budget.findById( { _id: _id }, function(err, budget) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Unable to load Item',
                error: err
            });
        }
        else {
            res.render('edit-item', {
                title: 'Edit item',
                budget: budget,
                user: req.user
            });
        }
    });
});

/* POST /budgetManager/_id - Processes form submission and updates the selected document */
router.post('/:_id', isLoggedIn, function(req, res, next) {

    // Gets the ID from the URL
    var _id = req.params._id;

    // Instantiate and populates a new budget object
    var budget = new Budget({
        itemPurchased: req.body.itemPurchased,
        quantityPurchased: req.body.quantityPurchased,
        price: req.body.price
    });

    // Update the budget
    Budget.update({ _id: _id }, budget, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Update Item',
                error: err
            });
        }
        else {
            res.redirect('/budgetManager');
        }
    });
});

// Make public
module.exports = router;
