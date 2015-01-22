Template.homeTemplate.helpers({
    username: function () {
        if(Meteor.userId()) {
            return Meteor.user().username;
        }
    }
});

Meteor.subscribe('hangBoardWorkouts');

Template.homeTemplate.events({
    'click .show-workouts': function () {
        Meteor.call('findWorkouts', {owner:Meteor.userId()}, {sort: {sessionNumber: 1}}, function(err, result) {
            if(typeof(err) !== 'undefined') {
                console.log(err);
            } else {
                if(typeof(result) !== 'undefined' && result.length > 0) {
                    Router.go('showWorkouts');
                } else {
                    Router.go('newCycleStepOne');
                }

            }

        });
    },
    'click .logout': function () {
        Meteor.logout();
    }
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});