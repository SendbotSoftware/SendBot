Template.homeTemplate.helpers({

});

Meteor.subscribe('hangBoardWorkouts');

Template.homeTemplate.events({
    'click .show-workouts': function () {
        Meteor.call('findWorkouts', {}, {sort: {sessionNumber: 1}}, function(err) {
            if(typeof(err) !== 'undefined') {
                console.log(err);
            } else {
                console.log('everything went fine in the findWorkouts call within home.js');
                Router.go('showWorkouts');
            }

        });
    }
});