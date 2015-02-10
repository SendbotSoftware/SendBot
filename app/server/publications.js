Meteor.publish('workouts', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Workouts.find({}, options);
});

