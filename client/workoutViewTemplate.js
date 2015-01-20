Template.workoutViewTemplate.helpers({
  selectedWorkout: function () {
    var workout = Workouts.findOne(Session.get('selectedWorkout'));
    return workout && workout.sessionNumber;
  },
  workouts: function () {
    return Workouts.find({}, {sort: {sessionNumber: 1}}).fetch();
  }

});

Template.workoutViewTemplate.events({
  'click .edit': function () {
    Router.go('editWorkout');
  },
  'click .new-workout': function () {
    Router.go('newWorkout');
  },
  'click .new-cycle': function () {
    Router.go('newCycleStepOne');
  }
});


