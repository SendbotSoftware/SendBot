//server only code

Meteor.startup(function () {

    Players.remove({});
    var sessionNumbers = ["1", "2","3","4","5","6" ];
    _.each(sessionNumbers, function (sessionNumber) {
      Players.insert({
        sessionNumber: sessionNumber,
        bodyWeight: 175,
        score: Math.floor(Random.fraction() * 10) * 5
      });
    });
});