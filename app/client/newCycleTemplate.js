

Template.newCycleTemplate.helpers({

});

Template.newCycleTemplate.events({
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
    Router.go('set');
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
              
              if($('#cycleA').is(':checked')){
                var cycleType = 'advanced';
              }else if($('#cycleI').is(':checked')){
                var cycleType = 'intermediete';
              }else if($('#cycleN').is(':checked')){
                var cycleType = 'novice';
              }

              var cycleNumber = (getLargestCycleNumber()+1),
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
                cycleNumber: cycleNumber,
                cycleType: cycleType,
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


