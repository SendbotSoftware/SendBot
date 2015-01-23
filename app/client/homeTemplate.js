Template.homeTemplate.helpers({

});

Template.homeTemplate.events({
  'click #view-workouts': function () {
   Router.go('workoutView');
  },
  'click #new-workout': function () {
   Router.go('newWorkout');
  },
 'click #new-cycle': function () {
   Router.go('newCycle');
  },
});

