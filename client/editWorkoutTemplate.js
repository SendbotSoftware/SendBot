/*Template Events and Helpers Functions Listed Here:*/

Template.editWorkoutTemplate.events({

});

Template.editWorkoutTemplate.helpers({
    workouts: function () {
    return Workouts.find({}, { sort: { sessionNumber: 1} });
  },
  selectedWorkout: function () {
    var workout = Workouts.findOne(Session.get(someValue));
    return workout && workout.sessionNumber;
  }

});

//Blaze.renderWithData(Template.editWorkout, Workouts.findOne(Session.get('selectedWorkout')),$('#editWorkoutModal')[0]);
/*Sub Functions Functions Listed Here:*/

function saveWorkout(fs){ 

          var bodyWeight = $('#bodyWeight').val();
          var res1 = $('#res1').val();
          var res2 = $('#res2').val();
          var res3 = $('#res3').val();
          var sets1 = $('#sets1').val();
          var sets2 = $('#sets2').val();
          var sets3 = $('#sets3').val();

          var workoutToModify = Workouts.findOne(Session.get('selectedWorkout'));

          var workout = {
            sessionNumber: workoutToModify.sessionNumber,
            date : workoutToModify.date,
            type : workoutToModify.type,
            repetitions : workoutToModify.repetitions,
            bodyWeight : bodyWeight,
            effortRating : workoutToModify.effortRating,
            grips : ['half crimp','pinch','3FP'],
            sets : [sets1, sets2, sets3],
            resistance : [res1, res2, res3],
            repMax : workoutToModify.repMax
          };
          Workouts.update(Session.get('selectedWorkout'),workout);
}

