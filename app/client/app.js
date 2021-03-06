
Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'homeTemplate',
    });
    this.route('newCycle', {
        template: 'newCycleTemplate',
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
    this.route('timer', {
        template: 'timerTemplate',
    });
    this.route('set', {
        template: 'setTemplate',
        data : {
            currentRPE: function () {return getLastWorkout().effortRating},
            currentGrip:  function () {return getLastWorkout().grips[GRIP_COUNTER]},
            currentRes: function () {return getLastWorkout().resistance[GRIP_COUNTER]}
        }
    });
});










