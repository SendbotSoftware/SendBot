Template.workoutTemplate.helpers({
  selected: function () {
    return Session.equals('selectedWorkout', this._id) ? 'selected' : '';
  }
});

Template.workoutTemplate.events({
  'click': function () {
    Session.set('selectedWorkout', this._id);
  },

  'click .toggle-checked': function () {
    Workouts.update(this._id, {$set: {checked: ! this.checked}});
  },

  'click .delete-workout': function () {
    var self = this;
    bootbox.confirm("Delete workout #" + self.sessionNumber, function(result) {
      if(result) {
        Workouts.remove(self._id);
      }
    });
  }
});