Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

WorkoutsListController = RouteController.extend({
  template: 'workoutsList',
  increment: 5,
  workoutsLimit: function() {
    return parseInt(this.params.workoutsLimit) || this.increment;
  },
  findOptions: function() {
    return {
      sort: this.sort,
      limit: this.workoutsLimit()
    };
  },
  subscriptions: function() {
    this.workoutsSub = Meteor.subscribe('workouts', this.findOptions());
  },
  workouts: function() {
    if(isUserLoggedIn()) {
      return Workouts.find({username: Meteor.user().username}, this.findOptions());
    } else {
      return [];
    }

  },
  data: function() {
    return {
      workouts: this.workouts(),
      ready: this.workoutsSub.ready
    };
  }
});

NewWorkoutsController = WorkoutsListController.extend({
  sort: {submitted: -1, _id: -1}
});

Router.route('/', {
  name: 'home',
  controller: NewWorkoutsController
});

Router.route('/new/:workoutsLimit?', {
  name: 'newWorkouts'
});

Router.route('/workouts/:_id', {
  name: 'workoutPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleWorkout', this.params._id)
    ];
  },
  data: function() {
    return Workouts.findOne(this.params._id);
  }
});

Router.route('/workouts/:_id/edit', {
  name: 'workoutEdit',
  waitOn: function() { 
    return Meteor.subscribe('singleWorkout', this.params._id);
  },
  data: function() {
    return Workouts.findOne(this.params._id);
  }
});

Router.route('/submit', {
  name: 'workoutSubmit'
});

var requireLogin = function() {
  if (!isUserLoggedIn()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'workoutPage'});
Router.onBeforeAction(requireLogin, {only: 'workoutSubmit'});
