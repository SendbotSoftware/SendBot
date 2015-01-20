Template.homeTemplate.helpers({

});


Template.homeTemplate.events({
    'click .show-workouts': function () {
        Meteor.call('findWorkouts', {}, {sort: {sessionNumber: 1}}, function(err, result) {
            if(typeof(err) !== 'undefined') {
                console.log(err);
            } else {
                if(result.length === 0) {
                    Router.go('newCycleStepOne');
                } else {
                    Router.go('showWorkouts', {}, {workouts : result});
                }

            }
        });
    }
});