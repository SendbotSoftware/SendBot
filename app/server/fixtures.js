// Fixture data 
if (Workouts.find().count() === 0) {
  var now = new Date().getTime();

  //Insert 10 workouts associated with kerwin
  for(var i = 0; i<10; i++) {
    Workouts.insert({
      username: 'kerwinloukusa',
      cycleNumber: 1,
      cycleType: 'advanced',
      sessionNumber: i,
      date : new Date(now - 12 * 3600 * 1000),
      bodyWeight : Math.floor((Math.random() * 10) + 165),
      type : 'V',
      repetitions : Math.floor((Math.random() * 6) + 4),
      effortRating : 9,
      grips : ['half_crimp','pinch','three_finger_open'],
      sets: [Math.floor((Math.random() * 6) + 4), Math.floor((Math.random() * 6) + 3), Math.floor((Math.random() * 6) + 4)],
      resistance : [Math.floor((Math.random() * 10) + 0), Math.floor((Math.random() * 10) + 0), Math.floor((Math.random() * 10) + 0)],
      repMax: Math.floor((Math.random() * 10) + 200)
    });
  }

  //Insert 10 workouts associated with rohan
  for(var i = 0; i<10; i++) {
    Workouts.insert({
      username: 'rohanbk',
      cycleNumber: 1,
      cycleType: 'advanced',
      sessionNumber: i,
      date : new Date(now - 12 * 3600 * 1000),
      bodyWeight : Math.floor((Math.random() * 10) + 165),
      type : 'V',
      repetitions : Math.floor((Math.random() * 6) + 4),
      effortRating : 9,
      grips : ['half_crimp','pinch','three_finger_open'],
      sets: [Math.floor((Math.random() * 6) + 4), Math.floor((Math.random() * 6) + 3), Math.floor((Math.random() * 6) + 4)],
      resistance : [Math.floor((Math.random() * 10) + 0), Math.floor((Math.random() * 10) + 0), Math.floor((Math.random() * 10) + 0)],
      repMax: Math.floor((Math.random() * 10) + 200)
    });
  }

}