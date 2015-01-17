
Template.newWorkoutTemplate.helpers({

});

Template.newWorkoutTemplate.events({
  'click .next': function () {
     if ($('#newWorkoutForm').parsley().validate()== true){
    Workouts.insert(generateWorkout($('#bodyWeight').val()));
    Router.go('workoutInProgress');
    };
  },
});

