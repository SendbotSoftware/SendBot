Template.workoutsList.helpers({
  workoutsWithRank: function() {
    return this.workouts.map(function(workout, index, cursor) {
      workout._rank = index;
      return workout;
    });
  },
  ownWorkout: function() {
    return this.userId == Meteor.userId();
  }
});
