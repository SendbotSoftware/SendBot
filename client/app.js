Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'homeTemplate'
    });
    this.route('newCycleStepOne', {
        template: 'newCycleStepOneTemplate'
    });
    this.route('newCycleStepTwo', {
        template: 'newCycleStepTwoTemplate'
    });
    this.route('editWorkout', {
        template: 'editWorkoutTemplate',
        data : function () {return Meteor.call('findOne', Session.get('selectedWorkout'))}
    });
    this.route('newWorkout', {
        template: 'newWorkoutTemplate'
    });
    this.route('login', {
        template: 'loginTemplate'
    });
    this.route('showWorkouts', {
        template: 'workoutViewTemplate',
        data: function () {Meteor.call('findWorkouts', {}, {sort: {sessionNumber: 1}}, function(err, result) {
            Session.set('workouts', result);
        })}

    })

});










