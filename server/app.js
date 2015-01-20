//server only code
if (Meteor.isServer) {
    Meteor.startup(function () {
        Meteor.methods({
            addWorkout: function (workout) {
                // Make sure the user is logged in before inserting a task

                /*if (! Meteor.userId()) {
                 throw new Meteor.Error("not-authorized");
                 }*/

                return Workouts.insert(workout);
            },
            deleteWorkout: function (criteria) {
                // check if user is logged in prior to performing db interaction
                Workouts.remove(criteria);
            },
            removeAllWorkouts: function () {
                Workouts.remove({});
            },
            removeWorkouts: function (query) {
                Workouts.remove(query)
            },
            findOne: function (query) {
                return Workouts.findOne(query);
            },
            findWorkouts: function (criteria, projection) {
                return Workouts.find(criteria, projection).fetch();
            },
            updateSelected: function (selectedWorkout, workout) {
                Workouts.update(selectedWorkout, workout);
            },
            getLastPerformedWorkout: function () {
                return Workouts.findOne({sessionNumber: Workouts.find().count()});
            }
        });
    });
}


//caclulate current date
function getDate() {
    var date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return month + '-' + day + '-' + year;
}




   