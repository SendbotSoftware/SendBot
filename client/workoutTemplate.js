Template.workoutTemplate.helpers({
  selected: function () {
    return Session.equals('selectedWorkout', this._id) ? 'selected' : '';
  }
});

Template.workoutTemplate.events({
  'click': function () {
    Session.set('selectedWorkout', this._id);
  },
  'click .delete': function () {
    var self = this;
    bootbox.confirm("Delete workout #" + self.sessionNumber, function(result) {
      if(result) {
        Meteor.call('deleteWorkout', self._id);
      }
    });
  }
});