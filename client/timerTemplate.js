Template.timerTemplate.helpers({

});

Template.timerTemplate.events({

});

Template.timerTemplate.rendered = function() {
    if(!this._rendered) {
          this._rendered = true;
          setTimer();
      
    }
}

var clock, interval, timeLeft,reps;
reps = 0;
clock = 8;

timeLeft = function() {
  if (clock > 0) {
    clock--;
    Session.set("time", clock);
    return;
  } else if(reps>0) {
    interval = Meteor.setInterval(timeLeft, 1000);
  }
  else  {
    return Meteor.clearInterval(interval);
  }
};

if (Meteor.isClient) {
    Template.timerTemplate.time = function() {
        return Session.get("time");
    };
}

setTimer = function(){
    interval = Meteor.setInterval(timeLeft, 1000);
    reps = 3;

};