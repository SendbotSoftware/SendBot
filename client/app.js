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
        data : function () {return Workouts.findOne(Session.get('selectedWorkout'))}
    });
    this.route('newWorkout', {
        template: 'newWorkoutTemplate'
    });
    this.route('login', {
        template: 'loginTemplate'
    });
    this.route('showWorkouts', {
        template: 'workoutViewTemplate'
    })

});










