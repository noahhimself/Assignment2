/*  File name : scripts
    Author's name : Noah Michael
    Website name : Budget Manager
    File description : This file contains the popup window before permanently deleting an item and validates the passwords and is a .js type
 */

// Confirmation before deletion
$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this purchase?');
});

// Validates the password while the user is entering the password under confirm
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
