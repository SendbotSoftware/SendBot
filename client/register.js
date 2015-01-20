Template.registerTemplate.events({
    'submit #register-form' : function(event, target) {
        event.preventDefault();
        var email = target.find('#account-email').value
            , password = target.find('#account-password').value;

        // Trim and validate the input

        Accounts.createUser({email: email, password : password}, function(err){
            if (err) {
                // Inform the user that account creation failed
            } else {
                // Success. Account has been created and the user
                // has logged in successfully.
            }

        });

        return false;
    }
});