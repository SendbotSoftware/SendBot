//server only code

Meteor.startup(function () {

    Workouts.remove({});
    var sessionNumbers = ["1", "2","3","4","5","6","7"];
    _.each(sessionNumbers, function (sessionNumber) {
      Workouts.insert({
        sessionNumber: sessionNumber,
        date: "12/25/2014",
        bodyWeight: 175,
        type : "V",
        repetitions : 5,
        effortRating : 9,
        grips : ["Half Crimp", "Pinch", "3FP"],
        sets : [0,0,0],
        resistance : [10, 15, 25],
        repMax : [200, 225, 250]
      });
    });
});

Meteor.methods({
  signedUrl: function(url) {
    // some proven-to-work-code that you can find at
    // http://stackoverflow.com/questions/18546676
    console.log(signed_url); // loggs the correctly signed url on the server
    return signed_url;
  }
});


   