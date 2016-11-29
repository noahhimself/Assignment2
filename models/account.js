/*  File name : account
    Author's name : Noah Michael
    Website name : Budget Manager
    File description : This file contains the link to mongoose and is a .js type
 */

// Link to mongoose
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
    // Passport defines username and password automatically
});

accountSchema.plugin(passportLocalMongoose);

// Make this file public
module.exports = mongoose.model('Account', accountSchema);