Template.workoutViewTemplate.helpers({
  selectedWorkout: function () {
    var workout = Meteor.call('findOne', Session.get('selectedWorkout'));
    return workout && workout.sessionNumber;
  },
  workouts: function () {
    return Session.get('workouts');
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


