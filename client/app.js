//client only code

Template.workoutView.helpers({
  workouts: function () {
    return Workouts.find({}, { sort: { sessionNumber: 1} });
  },
  selectedWorkout: function () {
    var workout = Workouts.findOne(Session.get("selectedWorkout"));
    return workout && workout.sessionNumber;
  }
});

Template.workoutView.events({
  'click .edit': function () {
    editWorkoutDialog();
  },
  'click .new_workout': function () {
    if(Workouts.find().count()==0){
      bootbox.alert("Hello world!", function() {
       Example.show("Hello world callback");
      });

    }else{
    var userBodyWeight = 175;
    Workouts.insert(generateWorkout(userBodyWeight));
    };
  },
  'click .new_cycle': function () {
      newCycleDialog();
  }

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

function editWorkoutDialog(fs){ // this can be tied to an event handler in another template
  bootbox.dialog({
    title: 'Editing Workout..',
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

function newCycleDialog(fs){ // this can be tied to an event handler in another template
  bootbox.dialog({
    title: 'New Cycle Geneation!',
    message: "<div id='dialogNode'></div>",
    buttons: {
      do: {
        label: "ok",
        className: "btn btn-primary",
        callback: function() {
          var bodyWeight = $('#bodyWeight').val();
          var half_crimp_bool = $('#half_crimp').is(":checked");
          var pinch_bool = $('#pinch').is(":checked");
          var four_finger_open_bool = $('#four_finger_open').is(":checked");
          var three_finger_open_bool = $('#three_finger_open').is(":checked");
          var two_finger_open_bool = $('#two_finger_open').is(":checked");

          if(half_crimp_bool){
            var g1 = 'half crimp'
          }else if(pinch_bool){
            var g2 = 'pinch'
          }else if(four_finger_open_bool){
            var g3 = 'four finger open'
          }else if(three_finger_open_bool){
             var g4 = 'three finger open'
          }else if(two_finger_open_bool){
             var g5 = 'two finger open'
          }


          workoutToModify = Workouts.findOne(Session.get("selectedWorkout"));

          workout = {
            sessionNumber: 1,
            date : getDate(),
            type : 'V',
            repetitions : 4,
            bodyWeight : bodyWeight,
            effortRating : 9,
            grips : [g1, g2, g3],
            sets : [0,0,0],
            resistance : [5,5,5],
            repMax : [225, 255, 265]
          };

          Workouts.insert(workout);
        }
      }
    }
  });
  Blaze.renderWithData(Template.newCycle,Workouts.findOne(Session.get("selectedWorkout")),dialogNode);
};

function getDate() {
    var date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return month + '-' + day + '-' + year;
};
