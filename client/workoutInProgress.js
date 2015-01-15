/*Template Events and Helpers Functions Listed Here:*/

Template.workoutInProgressTemplate.events({
  'click .save': function () {
    if (saveWorkout()){
    Router.go('home');
    }; 
  },
});

Template.workoutInProgressTemplate.helpers({

});

Template.workoutInProgressTemplate.rendered = function () {

  $('#editWorkoutForm').parsley({trigger: 'change'});
}

//Blaze.renderWithData(Template.editWorkout, Workouts.findOne(Session.get('selectedWorkout')),$('#editWorkoutModal')[0]);
/*Sub Functions Functions Listed Here:*/

function saveWorkout(fs){ 

          if ($('#workoutInProgressForm').parsley().validate()== true){      
          var bodyWeight = $('#bodyWeight').val();
          var res1 = $('#res1').val();
          var res2 = $('#res2').val();
          var res3 = $('#res3').val();
          var sets1 = $('#sets1').val();
          var sets2 = $('#sets2').val();
          var sets3 = $('#sets3').val();

          var workoutToModify = Workouts.findOne({sessionNumber: Workouts.find().count()});

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
          Workouts.update(Workouts.findOne({sessionNumber: Workouts.find().count()})._id,workout);

          return true;
        }else {
          return false;
        }
}

function checkWorkout(){

}



