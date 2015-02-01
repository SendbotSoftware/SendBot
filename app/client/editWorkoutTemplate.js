/*Template Events and Helpers Functions Listed Here:*/

Template.editWorkoutTemplate.events({
  'click .save': function () {
      saveWorkout();
  },
});

Template.editWorkoutTemplate.helpers({

});

Template.editWorkoutTemplate.rendered = function () {
  $('#editWorkoutForm').parsley({trigger: 'change'});
}

//Blaze.renderWithData(Template.editWorkout, Workouts.findOne(Session.get('selectedWorkout')),$('#editWorkoutModal')[0]);
/*Sub Functions Functions Listed Here:*/

function saveWorkout(fs){ 

      if ($('#editWorkoutForm').parsley().validate()== true){   
          workout = Workouts.findOne(Session.get('selectedWorkout'));

          var bodyweight = $('#bodyWeight').val(),
              res1 = $('#res1').val(),
              res2 = $('#res2').val(),
              res3 = $('#res3').val(),
              sets1 = $('#sets1').val(),
              sets2 = $('#sets2').val(),
              sets3 = $('#sets3').val(),
              repMax1 = calculate_1rm(workout.repetitions,workout.effortRating,+bodyweight+(+(res1))),
              repMax2 = calculate_1rm(workout.repetitions,workout.effortRating,+bodyweight+(+res2)),
              repMax3 = calculate_1rm(workout.reptitions,workout.effortRating,+bodyweight+(+res3));

          Workouts.update({
            _id: Session.get('selectedWorkout')
          }, {
            $set: {bodyWeight:bodyweight,
                   sets:[sets1, sets2, sets3],
                   resistance:[res1, res2, res3],
                   repMax: [repMax1,repMax2,repMax3] }
          });
          Router.go('workoutView');
      }else {
          return false;
      }
}




