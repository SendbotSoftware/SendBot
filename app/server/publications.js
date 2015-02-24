Meteor.publish('workouts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Workouts.find({}, options);
});

Meteor.publish('singleWorkout', function(id) {
  check(id, String);
  return Workouts.find(id);
});
