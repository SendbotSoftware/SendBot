Template.timerTemplate.helpers({

});

Template.timerTemplate.events({
     'click #high-effort': function () {
        SET_COUNTER = SET_COUNTER + 1;
         Router.go('timer');
    },
    'click #max-effort': function () {
        saveSetData();
        SET_COUNTER = 0;
        GRIP_COUNTER = GRIP_COUNTER+1;
        if(GRIP_COUNTER<3){
            Meteor.clearInterval(interval);
            Router.go('set');
        }else{
            GRIP_COUNTER = 0;
            Meteor.clearInterval(interval);
            
            Router.go('workoutView');
        }
    }

});

Template.timerTemplate.rendered = function() {
    if(!this._rendered) {
          this._rendered = true;
          setTimer(3);
      
    }
}

saveSetData = function(){
    currentWorkout = Workouts.findOne({sessionNumber: Workouts.find().count()});
    sets = currentWorkout.sets;
    sets[GRIP_COUNTER] = SET_COUNTER+1;

    Workouts.update({
        _id: currentWorkout._id
    }, {
        $set: {sets:sets}
    });
};

var clock, interval, timeLeft,reps, rest_flag;
rest_flag = false;
reps = 0;
clock = 8;

timeLeft = function() {
  if (clock > 0) {
    clock--;
    Session.set("time", clock);
    Session.set("rep", reps);
    return;
  }
  else  {
    if(reps>0){
        if(!rest_flag){
            rest_flag = !rest_flag;
            clock = 4;
        }else{
        reps = reps-1;
        clock = 8;
        }
    }else if(reps ==0){
       return Meteor.clearInterval(interval);
    }
  }
};

if (Meteor.isClient) {
    Template.timerTemplate.time = function() {
        return Session.get("time");
    };

}

if (Meteor.isClient) {
    Template.timerTemplate.reps = function(){
        return Session.get("rep");
    };
}



setTimer = function(input_reps){
    interval = Meteor.setInterval(timeLeft, 1);
    reps = input_reps;
};