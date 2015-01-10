//client only code

Template.workoutView.helpers({
  workouts: function () {
    return Workouts.find({}, { sort: { score: -1, name: 1 } });
  },
  selectedWorkout: function () {
    var workout = Workouts.findOne(Session.get("selectedWorkout"));
    return workout && workout.sessionNumber;
  }
});

Template.workoutView.events({
  'click .edit': function () {
    openMyDialog();
  },
  'click .new': function () {
    if(Workouts.find().count()==0){
      Workouts.insert(generateInitialWorkout());

    }else{
    var userBodyWeight = 175;
    Workouts.insert(generateWorkout(userBodyWeight));
    };
  },

});

Template.workout.helpers({
  selected: function () {
    return Session.equals("selectedWorkout", this._id) ? "selected" : '';
  }
});

Template.workout.events({
  'click': function () {
    Session.set("selectedWorkout", this._id);
  }
});

function openMyDialog(fs){ // this can be tied to an event handler in another template
  bootbox.dialog({
    title: 'This will populate with content from the "myDialog" template',
    message: "<div id='dialogNode'></div>",
    buttons: {
      do: {
        label: "ok",
        className: "btn btn-primary",
        callback: function() {
          var bodyWeight = $('#bodyWeight').val();
          var res1 = $('#res1').val();
          var res2 = $('#res2').val();
          var res3 = $('#res3').val();
          var sets1 = $('#sets1').val();
          var sets2 = $('#sets2').val();
          var sets3 = $('#sets3').val();

          workoutToModify = Workouts.findOne(Session.get("selectedWorkout"));

          workout = {
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

          Workouts.update(Session.get("selectedWorkout"),workout);
        }
      }
    }
  });
  Blaze.renderWithData(Template.editWorkout,Workouts.findOne(Session.get("selectedWorkout")),dialogNode);
};
