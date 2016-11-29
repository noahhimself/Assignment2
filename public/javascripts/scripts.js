/*  File name : scripts
    Author's name : Noah Michael
    Website name : Budget Manager
    File description : This file contains the popup window before permanently deleting an item and validates passwords and is a .js type
 */

$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this purchase?');
});

// Validates the password
var validator = $ ('#registerForm').validate({
    rules: {
        confirm: {
            required: true,
            equalTo: '#password'
        }
    },
    messages: {
        confirm: {
            equalTo: 'Your passwords do not match!'
        }
    }
});
