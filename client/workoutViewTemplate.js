Template.workoutViewTemplate.helpers({
  workouts: function () {
    return Meteor.call('findWorkouts', {}, { sort: { sessionNumber: 1} });
  },
  selectedWorkout: function () {
    var workout = Meteor.call('findOne', Session.get('selectedWorkout'));
    return workout && workout.sessionNumber;
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


