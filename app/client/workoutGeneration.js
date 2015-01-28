// gets last workout from mongo db 
getLastWorkout = function(){
    cycleNumber = getLargestCycleNumber();
    return Workouts.find({cycleNumber: cycleNumber}, {sort: {sessionNumber: -1}}).fetch()[0];
};

// generates new workout with user entered bodyweight
generateWorkout = function(userEnteredBodyweight){

    //get lastworkout from collection and build new workout variables
    var lastWorkout = getLastWorkout();

    if(lastWorkout.cycleType = CYCLE_TYPE.ADVANCED){

    }else if(lastWorkout.cycleType = CYCLE_TYPE.INTERMEDIATE){

    }
    else if(lastWorkout.cycleType = CYCLE_TYPE.NOVICE){

    }

    var workoutType = WORKOUT_TYPE.VOLUME,
    repetitions = calculate_reps(workoutType),
    effortRating = calculate_rpe().toString(),
    resistance = [Math.round(100* calculate_resistance(+repetitions, +effortRating, +userEnteredBodyweight, +lastWorkout.repMax[0]+weight_increase()))/100,
                  Math.round(100* calculate_resistance(+repetitions, +effortRating, +userEnteredBodyweight, +lastWorkout.repMax[1]+weight_increase()))/100,
                  Math.round(100* calculate_resistance(+repetitions, +effortRating, +userEnteredBodyweight, +lastWorkout.repMax[2]+weight_increase()))/100],
    repMax = [Math.round(100* calculate_1rm(+repetitions, +effortRating, +userEnteredBodyweight+(+resistance[0])).toString())/100,
              Math.round(100* calculate_1rm(+repetitions, +effortRating, +userEnteredBodyweight+(+resistance[1])).toString())/100,
              Math.round(100* calculate_1rm(+repetitions, +effortRating, +userEnteredBodyweight+(+resistance[2])).toString())/100];

    // build workout object and return to view to be rendered by template
    workout = {
        cycleNumber: lastWorkout.cycleNumber,
        cycleType: lastWorkout.cycleType,
        sessionNumber: (+lastWorkout.sessionNumber+1),
        date : getDate(),
        type : workoutType,
        repetitions : repetitions,
        bodyWeight : userEnteredBodyweight,
        effortRating : effortRating,
        grips : ['half crimp','pinch','3FP'],
        sets : ['','',''],
        resistance : resistance,
        repMax : repMax
    };
    return workout;
};

// calculates one repetition max based upon max hang time
// and bodyweight of user, VERY ROUGH FOR NOW
timeToOneRM = function(hangTimes,load){
  load = +load;
  rmOne = round((3.5*Math.log(hangTimes[0])*load/7+5),2);     
  rmTwo = round(3.5*Math.log(hangTimes[1])*load/7+5,2); 
  rmThree = round(3.5*Math.log(hangTimes[2])*load/7+5,2); 
  return [+rmOne,+rmTwo,+rmThree];
};

// a simple rounding function to truncate values to nice 
// usuable lengths
round = function(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};

// generates cycle number that can be used in the future
// to differeniate macro cycles for user, returns 1 for fow
// as place holder value
getLargestCycleNumber = function (){

  if(Workouts.find().count() == 0){
    return 0;
  }else{
    return Workouts.find({}, {sort: {cycleNumber: -1}}).fetch()[0].cycleNumber;
  }
  
};


//calculate RPE number based upon workout type and reps
calculate_rpe = function(wo_type, reps) {
    return EFFORT.HIGH;
};

//calculate workout Reps based upon workout type
calculate_reps = function(wo_type) {

     if (wo_type == WORKOUT_TYPE.VOLUME) {
          return (Math.floor(Math.random() * 4) + 3);
      } else {
          return (Math.floor(Math.random() * 3) + 1);
      }
};

//caclulate current date
getDate = function() {
    var date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return month + '-' + day + '-' + year;
};

//find right resistance for given rpe, reps
calculate_resistance = function(reps, rpe, weight, one_rep_max) {

    var res_min = -100;
    var res_max =  100;
    var diff = 0;
    var res_avg = 0;

    // search pattern chops search interval in half each iteration,
    // adjusting search range -50:50 to -100:100 does not have effect
    // on search time, but changing the diff-criteria does.
    while (true) {
        diff = calculate_1rm(reps, rpe, weight + res_avg) - one_rep_max;
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
weight_increase = function() {
    return 2;
};

//calculate 1rm
calculate_1rm = function(reps, rpe, weight) {
    var array = [
        [62, 66, 71, 74, 77, 80, 85, 90, 95, 100],
        [60, 64, 68, 71, 74, 77, 80, 85, 90, 95],
        [58, 62, 66, 68, 71, 74, 77, 80, 85, 90],
        [56, 60, 64, 66, 68, 71, 74, 77, 80, 85]
    ];
    var row = 10 - rpe;
    var column = 10 - reps;
    var percent = array[row][column];
    return weight / (percent / 100);
};