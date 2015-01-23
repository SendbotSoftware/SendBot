Template.setTemplate.helpers({

});

Template.setTemplate.events({
    'click #start-set': function () {
    	Meteor.clearInterval(interval);
        Router.go('timer');
    }
});


Template.setTemplate.rendered = function() {
    if(!this._rendered) {
          this._rendered = true;
          setRestTimer(180);    
    }
}

var clock, interval, timeLeft;
clock = 0;

setRestTimer = function(lengthOfRest){
    interval = Meteor.setInterval(timeLeft, 50);
    clock = lengthOfRest;
};

timeLeft = function() {
  if (clock > 0) {
    clock--;
    Session.set("time", clock);
    return;
  }
  else  {
    Meteor.clearInterval(interval);
  }
};

if (Meteor.isClient) {
    Template.setTemplate.minutes= function() {
      return ~~(Session.get("time")/60);
    };
    Template.setTemplate.seconds = function() {
        return (Session.get("time")%60);
    };
}

