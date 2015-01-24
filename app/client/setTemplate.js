var clock, interval, timeLeft;

Template.setTemplate.helpers({

});

Template.setTemplate.events({
    'click #start-set': function () {
    	startSet();
    }
});

// on render initialize clock value to zero
// and setup timer 
Template.setTemplate.rendered = function() {
    clock = 0;

    if(!this._rendered) {
        this._rendered = true;
        setupRestTimer(180);    
    }
};

// helper functions to retun minutes/seconds
// values to the view
if (Meteor.isClient) {
    Template.setTemplate.minutes= function() {
      return ~~(Session.get("time")/60);
    };
    Template.setTemplate.seconds = function() {
        return (Session.get("time")%60);
    };
}

// clear the current clock out and then
// go to the timer for the given set
startSet = function(){
    Meteor.clearInterval(interval);
    Router.go('timer');
};

// sets up the timer used to help the user time 
// the rest period
setupRestTimer = function(lengthOfRest){
    interval = Meteor.setInterval(restTimer, 50);
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
    Meteor.clearInterval(interval);
  }
};



