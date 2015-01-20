Template.homeTemplate.helpers({

});


Template.homeTemplate.events({
    'click .show-workouts': function () {
        //TODO use pub/sub to avoid excessive code duplication
        Meteor.call('findWorkouts', {}, {sort: {sessionNumber: 1}}, function(err, result) {
            if(typeof(err) !== 'undefined') {
                console.log(err);
            } else {
                if(result.length === 0) {
                    Router.go('newCycleStepOne');
                } else {
                    Session.set('workouts', result);
                    Router.go('showWorkouts');

                }

            }
        });
    }
});