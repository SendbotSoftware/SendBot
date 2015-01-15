Template.newWorkoutTemplate.helpers({

});

Template.newWorkoutTemplate.events({
  'click .next': function () {
    Workouts.insert(generateWorkout($('#bodyWeight').val()));
    Router.go('home');
  }
});

generateInitialWorkout = function(){
    return {
        sessionNumber: 1,
        date : getDate(),
        bodyWeight : 175,
        type : 'V',
        repetitions : calculateRepetitions("volume"),
        effortRating :  calculateRPE().toString(),
        grips : ['half crimp','pinch','3FP'],
        sets : ['4', '4', '4'],
        resistance : ['15', '15', '17'],
        repMax : ['145', '155' ,'165']
    };
};

getLastWorkout = function(){
    return Workouts.findOne({sessionNumber: Workouts.find().count()});
};

generateWorkout = function(userBodyWeight){

    //get lastworkout from collection and build new workout variables
    var lastWorkout = getLastWorkout(),
        workoutType = 'V',
        repetitions = calculateRepetitions(workoutType),
        effortRating = calculateRPE().toString(),
        resistance = [Math.round(100* calculateResistance(+repetitions, +effortRating, +userBodyWeight, +lastWorkout.repMax[0]+weightIncrease()))/100,
                      Math.round(100* calculateResistance(+repetitions, +effortRating, +userBodyWeight, +lastWorkout.repMax[1]+weightIncrease()))/100,
                      Math.round(100* calculateResistance(+repetitions, +effortRating, +userBodyWeight, +lastWorkout.repMax[2]+weightIncrease()))/100],
        repMax = [Math.round(100* calculateOneRepMax(+repetitions, +effortRating, +userBodyWeight+(+resistance[0])).toString())/100,
                  Math.round(100* calculateOneRepMax(+repetitions, +effortRating, +userBodyWeight+(+resistance[1])).toString())/100,
                  Math.round(100* calculateOneRepMax(+repetitions, +effortRating, +userBodyWeight+(+resistance[2])).toString())/100];

    // build workout object and return to view to be rendered by template
    return {
        sessionNumber: (+lastWorkout.sessionNumber+1),
        date : getDate(),
        type : workoutType,
        repetitions : repetitions,
        bodyWeight : userBodyWeight,
        effortRating : effortRating,
        grips : ['half crimp','pinch','3FP'],
        sets : ['','',''],
        resistance : resistance,
        repMax : repMax
    };
};


//calculate RPE number based upon workout type and reps
function calculateRPE() {
    return 9;
}

//calculate workout Reps based upon workout type
function calculateRepetitions(wo_type) {

     if (wo_type == 'volume') {
          return (Math.floor(Math.random() * 4) + 3);
      } else {
          return (Math.floor(Math.random() * 3) + 1);
      }
}

function getDate() {
    var date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return month + '-' + day + '-' + year;
}

//find right resistance for given rpe, reps
function calculateResistance(reps, rpe, weight, one_rep_max) {

    var res_min = -100,
        res_max =  100,
        diff,
        res_avg = 0;

    // search pattern chops search interval in half each iteration,
    // adjusting search range -50:50 to -100:100 does not have effect
    // on search time, but changing the diff-criteria does.
    while (true) {
        diff = calculateOneRepMax(reps, rpe, weight + res_avg) - one_rep_max;
        if ((Math.abs(diff) < .1)) {
            return res_avg;
        }
        // if diff is negative, res_avg is to small, make min_res equal
        // to avg and restart search with new search interval.
        if(diff<0){
           res_min = res_avg;
        }else{
          res_max = res_avg;
        }
        res_avg = (res_min+res_max)/2;

        //if the range is not wide enough, break out instead of crashing instance
        if (Math.abs(res_avg-res_max)<.001){
            return 0;
        }if (Math.abs(res_avg-res_min)<.001){
            return 0;
        }
    }
};

//calculate weight increase from previous sesion.
function weightIncrease() {
    return 2;
};

//calculate 1rm
function calculateOneRepMax(reps, rpe, weight) {
    var array = [
            [62, 66, 71, 74, 77, 80, 85, 90, 95, 100],
            [60, 64, 68, 71, 74, 77, 80, 85, 90, 95],
            [58, 62, 66, 68, 71, 74, 77, 80, 85, 90],
            [56, 60, 64, 66, 68, 71, 74, 77, 80, 85]
        ],
        row = 10 - rpe,
        column = 10 - reps,
        percent = array[row][column];

    return weight / (percent / 100);
};