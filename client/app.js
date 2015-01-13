Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'homeTemplate',
    });
    this.route('newCycleStepOne', {
        template: 'newCycleStepOneTemplate',
    });
    this.route('newCycleStepTwo', {
        template: 'newCycleStepTwoTemplate',
    });
    this.route('editWorkout', {
        template: 'editWorkoutTemplate',
             data : {
             someValue: Session.get('selectedWorkout')
        },
    });
      this.route('newWorkout', {
        template: 'newWorkoutTemplate',
    });
});









