var clock, interval, timeLeft;
var chime = new buzz.sound('/sounds/Ding.mp3');

Template.newCycleSetTemplate.helpers({

});

Template.newCycleSetTemplate.events({
    'click #start-sets': function () {
      startSet();
    }
});

// on render initialize clock value to zero
// and setup timer 
Template.newCycleSetTemplate.rendered = function() {
    clock = 0;

    if(!this._rendered) {
        this._rendered = true;
        setupRestTimer(180);    
    }
};

// helper functions to retun minutes/seconds
// values to the view
if (Meteor.isClient) {
    Template.newCycleSetTemplate.minutes= function() {
      return ~~(Session.get("time")/60);
    };
    Template.newCycleSetTemplate.seconds = function() {
        return (Session.get("time")%60);
    };
}

// clear the current clock out and then
// go to the timer for the given set
function startSet(){
    Meteor.clearInterval(interval);
    Router.go('newCycleTimer');
};

// sets up the timer used to help the user time 
// the rest period
setupRestTimer = function(lengthOfRest){
    interval = Meteor.setInterval(restTimer, 1000);
    clock = lengthOfRest;
};

// function that holds the logic for running the 
// rest timer 
restTimer = function() {
  if (clock > 0) {
    clock--;
    Session.set("time", clock);
    return;
  }
  else  {
    chime.play();
    Meteor.clearInterval(interval);
  }
};



