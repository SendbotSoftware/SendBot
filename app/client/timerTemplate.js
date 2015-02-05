var clock, interval, timeLeft,reps, rest_flag;
var chime = new buzz.sound('/sounds/Ding.mp3');

Template.timerTemplate.helpers({

});

Template.timerTemplate.events({
    'click #high-effort': function () {
        goToSet();
    },
    'click #max-effort': function () {
        processGripData();
    }

});

// called on template render, intializes variables and
// calls timer function
Template.timerTemplate.rendered = function() {

    rest_flag = false;
    reps = 0;
    clock = 8;

    reps = Workouts.findOne({sessionNumber: Workouts.find().count()}).repetitions;

    if(!this._rendered) {
        this._rendered = true;
        setupTimer(reps);  
    }
}

// helper methods to get timer and rep data for view
if (Meteor.isClient) {
    Template.timerTemplate.time = function() {
        return Session.get("time");
    };
        Template.timerTemplate.reps = function(){
        return Session.get("rep");
    };

}


// go to set after incrementing the counter of sets that user has performed
// for given grip, effort level is recoreded as well
goToSet = function(){
    SET_COUNTER = SET_COUNTER + 1;
    Router.go('set');
};

// process the cumalative set data after the user has clicked the max effort 
// button, meaning that their work on this grip is done for the day
processGripData = function(){

    // get the database record from the data base and find the correct entry in
    // the sets array
    currentWorkout = getLastWorkout();
    sets = currentWorkout.sets;
    sets[GRIP_COUNTER] = SET_COUNTER+1;

    // set the proper value in the workout document
    Workouts.update({
        _id: currentWorkout._id
    }, {
        $set: {sets:sets}
    });

    // reset the set counter, and increment the grip counter
    SET_COUNTER = 0;
    GRIP_COUNTER = GRIP_COUNTER+1;

    // if the grip counter is less then three, continue the workout,
    // if the grip counter is equal to 3, clear working variables and
    // proceed to viewing workouts
    if(GRIP_COUNTER<3){
        Meteor.clearInterval(interval);
        Router.go('set');
    }else{
        GRIP_COUNTER = 0;
        Meteor.clearInterval(interval);
        Router.go('workoutView');
    }

}

// the timer used to time the sets, assumes fixed work/rest periods of 
// 7 seconds on, 3 seconds off, uses global variable reps and rest flag
// to process states
intervalTimer = function() {
  if (clock > 0) {
    clock--;
    Session.set("time", clock);
    Session.set("rep", reps);
    return;
  }
  else  {
    chime.play();
    if(reps>0){
        if(!rest_flag){
            rest_flag = !rest_flag;
            clock = 4;
        }else{
       
        reps = reps-1;
        clock = 8;
        }
    }else if(reps ==0){
         chime.play();
       return Meteor.clearInterval(interval);
    }
  }
};

// sets up the interval timer (intervalTimer)
setupTimer = function(input_reps){
    interval = Meteor.setInterval(intervalTimer, 1000);
    reps = input_reps;
};