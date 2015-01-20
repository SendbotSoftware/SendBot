Template.newCycleStepOneTemplate.helpers({

});

Template.newCycleStepOneTemplate.events({
  'click .next': function () {
    Router.go('newCycleStepTwo');
  }
});

Template.newCycleStepTwoTemplate.helpers({

});

Template.newCycleStepTwoTemplate.events({
  'click .next': function () {
    Meteor.call('addWorkout', generateInitialWorkout(175), function(){
      Meteor.call('findWorkouts', {}, {sort: {sessionNumber: 1}}, function(err, result) {
        if(typeof(err) !== 'undefined') {
          console.log(err);
        } else {
          if(result.length === 0) {
            Router.go('newCycleStepOne');
          } else {
            Router.go('showWorkouts', {}, {workouts : result});
          }

        }
      });
    });

  }
});

function newCycleDialog(fs){ // this can be tied to an event handler in another template
  bootbox.dialog({
    title: 'New Cycle Geneation!',
    message: '<div id="newWorkoutModal"></div>',
    buttons: {
      do: {
        label: 'ok',
        className: 'btn btn-primary',
        callback: function() {

          //TODO this feels messy; we should try to make this more object oriented if possible
          var bodyWeight = $('#bodyWeight').val();
          var half_crimp_bool = $('#half_crimp').is(':checked');
          var pinch_bool = $('#pinch').is(':checked');
          var four_finger_open_bool = $('#four_finger_open').is(':checked');
          var three_finger_open_bool = $('#three_finger_open').is(':checked');
          var two_finger_open_bool = $('#two_finger_open').is(':checked');
          var grips = [];

          if(half_crimp_bool){
            grips.push('half crimp');
          }else if(pinch_bool){
            grips.push('pinch');
          }else if(four_finger_open_bool){
            grips.push('four finger open');
          }else if(three_finger_open_bool){
            grips.push('three finger open');
          }else if(two_finger_open_bool){
            grips.push('two finger open');
          }

          var workout = {
            sessionNumber: 1,
            date : getDate(),
            type : 'V',
            repetitions : 4,
            bodyWeight : bodyWeight,
            effortRating : 9,
            grips : grips,
            sets : [0,0,0],
            resistance : [5,5,5],
            repMax : [225, 255, 265]
          };

          Meteor.call('addWorkout', workout);
        }
      }
    }
  });
  Blaze.renderWithData(Template.newCycle, Meteor.call('findOne', Session.get('selectedWorkout')), $('#newWorkoutModal')[0]);
}

function getDate() {
  var date = new Date(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      year = date.getFullYear();
  return month + '-' + day + '-' + year;
}
