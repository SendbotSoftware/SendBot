Template.setDataTemplate.helpers({

});

Template.setDataTemplate.events({
    'click #high-effort': function () {
        SET_COUNTER = SET_COUNTER + 1;
         Router.go('timer');
    },
    'click #max-effort': function () {
        saveSetData();
        SET_COUNTER = 0;
        GRIP_COUNTER = GRIP_COUNTER+1;
        if(GRIP_COUNTER<3){
            Router.go('set');
        }else{
            GRIP_COUNTER = 0;
            Router.go('workoutView');
        }
    }
});

saveSetData = function(){
    currentWorkout = Workouts.findOne({sessionNumber: Workouts.find().count()});
    sets = currentWorkout.sets;
    sets[GRIP_COUNTER] = SET_COUNTER+1;

    Workouts.update({
        _id: currentWorkout._id
    }, {
        $set: {sets:sets}
    });
};





