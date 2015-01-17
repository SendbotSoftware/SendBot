Template.timerTemplate.helpers({

});

Template.timerTemplate.events({

});

Template.timerTemplate.rendered = function() {
    if(!this._rendered) {
          this._rendered = true;
          interval = Meteor.setInterval(timeLeft, 1000);
      
    }
}

var clock, interval, timeLeft;

clock = 10;

timeLeft = function() {
  if (clock > 0) {
    clock--;
    Session.set("time", clock);
    return console.log(clock);
  } else {
    console.log("That's All Folks");
    return Meteor.clearInterval(interval);
  }
};

if (Meteor.isClient) {
    Template.timer.time = function() {
        return Session.get("time");
    };
}