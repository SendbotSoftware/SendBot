Template.timerTemplate.helpers({

});

Template.timerTemplate.events({

});

Template.timerTemplate.rendered = function() {
    if(!this._rendered) {
          this._rendered = true;
          setTimer(3);
      
    }
}

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
        Meteor.clearInterval(interval);
        return Router.go('setData');
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
    interval = Meteor.setInterval(timeLeft, 5);
    reps = input_reps;
};