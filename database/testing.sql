-- INSERT INTO TypeLevels(levelID, typeID, sets, reps, restTime)
-- VALUES 
-- ((SELECT levelID FROM Levels WHERE name = "Beginner"), (SELECT typeID FROM Types WHERE name = "Compound"), "2", "6-8", "3:00"), 
-- ((SELECT levelID FROM Levels WHERE name = "Intermediate"), (SELECT typeID FROM Types WHERE name = "Compound"), "3", "8-10", "2:30"),
-- ((SELECT levelID FROM Levels WHERE name = "Advanced"), (SELECT typeID FROM Types WHERE name = "Compound"), "4", "10-12", "2:00");



DROP TABLE IF EXISTS Quotes;
DROP TABLE IF EXISTS FitnessTips;
DROP TABLE IF EXISTS WeightExercises;
DROP TABLE IF EXISTS HIITExercises;
DROP TABLE IF EXISTS MuscleGroups;
DROP TABLE IF EXISTS TypeLevels; 
DROP TABLE IF EXISTS Types;
DROP TABLE IF EXISTS Levels;

