Template.workoutSubmit.created = function() {
  Session.set('workoutSubmitErrors', {});
};

Template.workoutSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('workoutSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('workoutSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.workoutSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var workout = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    
    var errors = validateWorkout(workout);
    if (errors.title || errors.url)
      return Session.set('workoutSubmitErrors', errors);
    
    Meteor.call('workoutInsert', workout, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.workoutExists)
        throwError('There was something wrong submitting this workout');
      
      Router.go('workoutPage', {_id: result._id});
    });
  }
});