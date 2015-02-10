(function(){Workouts = new Mongo.Collection("workout");

    Workouts.allow({
        update: function(userId, workout) { return ownsDocument(userId, workout); },
        remove: function(userId, workout) { return ownsDocument(userId, workout); }
    });

    Workouts.deny({
        update: function(userId, workout, fieldNames, modifier) {
            var errors = validateWorkout(modifier.$set);
            return errors.title || errors.url;
        }
    });

    validateWorkout = function (workout) {
        var errors = {};

        //TODO @rbalakrishnan add workout validation code

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
            if (!$.isEmptyObject(errors)) {
                throw new Meteor.Error('invalid-workout', "You must set a title and URL for your workout");
            }


            var user = Meteor.user();
            var workout = _.extend(workoutAttributes, {
                userId: user._id,
                owner: user.username,
                submitted: new Date()
            });

            var workoutId = Workouts.insert(workout);

            return {
                _id: workoutId
            };
        }
    });
})();