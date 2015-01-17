Template.workoutViewTemplate.helpers({
  workouts: function () {
    return Workouts.find({}, { sort: { sessionNumber: 1} });
  },
  selectedWorkout: function () {
    var workout = Workouts.findOne(Session.get('selectedWorkout'));
    return workout && workout.sessionNumber;
  }
});


Template.workoutViewTemplate.events({
  'click #edit-workout': function () {
    Router.go('editWorkout');
  },
  'click #new-workout': function () {
    Router.go('newWorkout');
  },

  'click #new-cycle': function () {
    Router.go('newCycleStepOne');
  }
});


