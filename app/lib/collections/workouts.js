Workouts = new Mongo.Collection('workouts');

Workouts.allow({
  update: function(userId, workout) { return ownsDocument(userId, workout); },
  remove: function(userId, workout) { return ownsDocument(userId, workout); }
});

Workouts.deny({
  update: function(userId, workout, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Workouts.deny({
  update: function(userId, workout, fieldNames, modifier) {
    var errors = validateWorkout(modifier.$set);
    return errors.title || errors.url;
  }
});

validateWorkout = function (workout) {
  var errors = {};

  //TODO @rohanbk Add validation for workout objects

  return errors;
};

Meteor.methods({
  workoutInsert: function(workoutAttributes) {
    check(this.userId, String);
    check(workoutAttributes, {
      title: String,
      url: String
    });
    
    var errors = validateWorkout(workoutAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-workout', "You must set a title and URL for your workout");
    
    var workoutWithSameLink = Workouts.findOne({url: workoutAttributes.url});
    if (workoutWithSameLink) {
      return {
        workoutExists: true,
        _id: workoutWithSameLink._id
      }
    }
    
    var user = Meteor.user();
    var workout = _.extend(workoutAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      upvoters: [],
      votes: 0
    });
    
    var workoutId = Workouts.insert(workout);
    
    return {
      _id: workoutId
    };
  }
});
