//server only code

Meteor.startup(function () {

    
    //Workouts.remove({});
    
});

//caclulate current date
function getDate() {
    var date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return month + '-' + day + '-' + year;
}




   