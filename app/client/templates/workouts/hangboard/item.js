var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.workoutItem.helpers({
  ownWorkout: function() {
    return this.username == Meteor.user().username;
  },

  attributes: function() {
    var workout = _.extend({}, Positions.findOne({workoutId: this._id}), this);
    var newPosition = workout._rank * POST_HEIGHT;
    var attributes = {};
    
    if (_.isUndefined(workout.position)) {
      attributes.class = 'workout invisible';
    } else {
      var delta = workout.position - newPosition;
      attributes.style = "top: " + delta + "px";
      if (delta === 0)
        attributes.class = "workout animate"
    }
    
    Meteor.setTimeout(function() {
      Positions.upsert({workoutId: workout._id}, {$set: {position: newPosition}})
    });
    
    return attributes;
  }
});

Template.workoutItem.events({

});