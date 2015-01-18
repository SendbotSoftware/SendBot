//code shared between client and server
Workouts = new Mongo.Collection("workout");

//Enumeration Definitions
EFFORT = {
  HIGH : 9, 
  MAX: 10
};

WORKOUT_TYPE = {
    VOLUME: 'v',
    INTENSITY: 'i'
};

GRIP_COUNTER = 0;
SET_COUNTER = 0;