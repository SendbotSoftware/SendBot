

Template.newCycleStepOneTemplate.helpers({

});

Template.newCycleStepOneTemplate.events({
  'click #next': function () {
    $(document).ready(function () {
        $('.next').on('click', function () {
        var current = $(this).data('currentBlock'),
          next = $(this).data('nextBlock');

        // only validate going forward. If current group is invalid, do not go further
        // .parsley().validate() returns validation result AND show errors
        if (next > current)
          if (false === $('#demo-form').parsley().validate('block' + current))
            return;

        // validation was ok. We can go on next step.
        $('.block' + current)
          .removeClass('show')
          .addClass('hidden');

        $('.block' + next)
          .removeClass('hidden')
          .addClass('show');
       });
    });
  },

  'click #submit': function(){
    Workouts.insert(processNewCycleData());
    Router.go('workoutInProgress');
  }


});

Template.newCycleStepTwoTemplate.helpers({

});

Template.newCycleStepTwoTemplate.events({
  'click .next': function () {
    if ($('#newCycleFormStepTwo').parsley().validate()== true){
    Workouts.insert(generateInitialWorkout(175));
    Router.go('home');
   }
  }
});


function processNewCycleData(fs){ 
    
          var bodyWeight = $('#bodyWeight').val(),
              half_crimp = $('#half_crimp').is(':checked') ,
              pinch = $('#pinch').is(':checked'),
              four_finger_open = $('#four_finger_open').is(':checked'), 
              three_finger_open = $('#three_finger_open').is(':checked'), 
              two_finger_open = $('#two_finger_open').is(':checked'),
              hangTimeOne = $('#hangTimeOne').val(),
              hangTimeTwo = $('#hangTimeTwo').val(),
              hangTimeThree = $('#hangTimeThree').val();

              var cycleNumber =1,
                sessionNumber = 1,
                date = getDate(),
                bodyWeight = bodyWeight,
                type = 'v',
                repetitions = calculate_reps(type),
                effortRating = calculate_rpe().toString(),
                grips = ['half_crimp','pinch','three_finger_open'],
                sets = ['','',''],
                repMax = timeToOneRM([hangTimeOne,hangTimeTwo,hangTimeThree],bodyWeight)
                resistance = [Math.round(100* calculate_resistance(+repetitions, +effortRating, +bodyWeight, +repMax[0]))/100,
                  Math.round(100* calculate_resistance(+repetitions, +effortRating, +bodyWeight, +repMax[1]))/100,
                  Math.round(100* calculate_resistance(+repetitions, +effortRating, +bodyWeight, +repMax[2]))/100],
                

              workout = {
                cycleNumber: 1,
                sessionNumber: 1,
                date : date,
                bodyWeight : bodyWeight,
                type : type,
                repetitions : repetitions,
                effortRating : effortRating,
                grips : grips,
                sets : sets,
                resistance : resistance,
                repMax : repMax
              };
              return workout;
};


timeToOneRM = function(hangTimes,load){
  load = +load;
  rmOne = 3.5*Math.log(hangTimes[0])*load/7+5;     
  rmTwo = 3.5*Math.log(hangTimes[1])*load/7+5; 
  rmThree = 3.5*Math.log(hangTimes[2])*load/7+5; 
  return [+rmOne,+rmTwo,+rmThree];
};

function getCycleNumber(){
  return 1;
};

function getDate() {
  var date = new Date(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      year = date.getFullYear();
  return month + '-' + day + '-' + year;
};


//calculate RPE number based upon workout type and reps
function calculate_rpe(wo_type, reps) {
    return EFFORT.HIGH;
};

//calculate workout Reps based upon workout type
function calculate_reps(wo_type) {

     if (wo_type == WORKOUT_TYPE.VOLUME) {
          return (Math.floor(Math.random() * 4) + 3);
      } else {
          return (Math.floor(Math.random() * 3) + 1);
      }
};

//caclulate current date
function getDate() {
    var date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return month + '-' + day + '-' + year;
};

//find right resistance for given rpe, reps
function calculate_resistance(reps, rpe, weight, one_rep_max) {

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
function wt_increase() {
    return 2;
};

//calculate 1rm
function calculate_1rm(reps, rpe, weight) {
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
