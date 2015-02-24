Template.workoutEdit.created = function() {
  Session.set('workoutEditErrors', {});
}

Template.workoutEdit.helpers({
  errorMessage: function(field) {
    return Session.get('workoutEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('workoutEditErrors')[field] ? 'has-error' : '';
  }
});

Template.workoutEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentWorkoutId = this._id;
    
    var workoutProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    
    var errors = validateWorkout(workoutProperties);
    if (errors.title || errors.url)
      return Session.set('workoutEditErrors', errors);
    
    Workouts.update(currentWorkoutId, {$set: workoutProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('workoutPage', {_id: currentWorkoutId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this workout?")) {
      var currentWorkoutId = this._id;
      Workouts.remove(currentWorkoutId);
      Router.go('home');
    }
  }
});
