//server only code

Meteor.startup(function () {

    Players.remove({});
    var sessionNumbers = ["1", "2","3","4","5","6" ];
    _.each(sessionNumbers, function (sessionNumber) {
      Players.insert({
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


   