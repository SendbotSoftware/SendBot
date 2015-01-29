//code shared between client and server
Workouts = new Mongo.Collection("workout");

CYCLE_TYPE = {
	NOVICE: 'novice',
	INTERMEDIATE: 'intermediate',
	ADVANCED: 'advanced'
}



//Enumeration Definitions
EFFORT = {
  MODERATE: 8,
  HIGH : 9, 
  MAX: 10
};

WORKOUT_TYPE = {
    VOLUME: 'v',
    INTENSITY: 'i'
};

GRIP_COUNTER = 0;
SET_COUNTER = 0;