
Template.newWorkoutTemplate.helpers({

});

Template.newWorkoutTemplate.events({
  'click .next': function () {
    newWorkout();
  },
});

function newWorkout(){
	if ($('#newWorkoutForm').parsley().validate()== true){
    	Workouts.insert(generateWorkout($('#bodyweight').val()));
    	Router.go('set');
    };
}
