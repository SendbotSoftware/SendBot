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
    Workouts.update(Session.get("selectedWorkout"), {$inc: {score: 5}});
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
