//server only code
if (Meteor.isServer) {
    Meteor.startup(function () {
        Meteor.methods({
            addWorkout: function (workout) {

                return Workouts.insert(workout);
            },
            deleteWorkout: function (criteria) {
                // check if user is logged in prior to performing db interaction
                return Workouts.remove(criteria);
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
                Meteor.publish('hangBoardWorkouts', function() {
                    return Workouts.find(criteria, projection);
                });
            },
            updateSelected: function (selectedWorkout, workout) {
                Workouts.update(selectedWorkout, workout);
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




   