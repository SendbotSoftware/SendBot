//ENUMERATION DEFINITIONS



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
        data : function () {return Workouts.findOne(Session.get('selectedWorkout'))}
    });
    this.route('newWorkout', {
        template: 'newWorkoutTemplate',
    });
    this.route('workoutView', {
        template: 'workoutViewTemplate',
        data : function () {return Workouts.findOne({sessionNumber: Workouts.find().count()})}
    });
    this.route('workoutInProgress', {
        template: 'workoutInProgressTemplate',
        data : function () {return Workouts.findOne({sessionNumber: Workouts.find().count()})}
    });
    this.route('timer', {
        template: 'timerTemplate',
    });
    this.route('setData', {
        template: 'setDataTemplate',
    });
    this.route('set', {
        template: 'setTemplate',
        data : {
            currentGrip:  function () {return Workouts.findOne({sessionNumber: Workouts.find().count()}).grips[GRIP_COUNTER]},
            currentRes: function () {return Workouts.findOne({sessionNumber: Workouts.find().count()}).resistance[GRIP_COUNTER]}
        }
    });
    

});










