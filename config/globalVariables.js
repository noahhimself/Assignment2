/*  File name : globalVariables
    Author's name : Noah Michael
    Website name : Budget Manager
    File description : This file contains the global variables for connection to mLab and is a .js type
 */

module.exports = {
    // Database connection to mLab
    db: 'mongodb://noahhimself:Sweetheart22@ds153677.mlab.com:53677/assignment2',
    secret: 'Random string used to salt',
    ids: {
        facebook: {
            clientID: '956378734494168',
            clientSecret: '37c289f90bba6cd2dd51b318b39e7aaa',
            callbackURL: 'http://localhost:3000/facebook/callback'
            //callbackURL: 'http://assignment2-200306035.herokuapp.com/facebook/callback'
        }
    }
};