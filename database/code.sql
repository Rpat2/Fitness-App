-- SELECT WeightExercisesExercises.name AS Exercise_Name, MuscleGroups.name AS Muscle_Group, Complexities.name AS Complexity, Types.name AS Type
-- FROM Exercises
-- INNER JOIN MuscleGroups ON WeightExercisesExercises.muscleGroupID = MuscleGroups.muscleGroupID
-- INNER JOIN Types ON WeightExercisesExercises.complexityID = Complexities.complexityID
-- INNER JOIN Types ON Exercises.typeID = Types.typeID; 

-- UPDATE MICRO_Goals 
-- SET current = 145, currentDate = "2024-11-12"
-- WHERE goalID = 1;



-- SELECT target FROM MICRO_Goals WHERE goalID = 1; 






-- SELECT WeightExercises.name as Exercise_Name, MuscleGroups.name as Muscle_Group, Types.name as Type, Levels.name as LevelName, TypeLevels.sets, TypeLevels.reps, TypeLevels.restTime
-- FROM WeightExercises
-- INNER JOIN MuscleGroups ON MuscleGroups.muscleGroupID = WeightExercises.muscleGroupID
-- INNER JOIN Types ON Types.typeID = WeightExercises.typeID
-- INNER JOIN TypeLevels ON Types.typeID = TypeLevels.typeID
-- INNER JOIN Levels ON Levels.levelID = TypeLevels.levelID
-- WHERE Levels.name = "Intermediate" AND MuscleGroups.name = "Back"
-- ORDER BY RAND()
-- LIMIT 1;


-- SELECT HIITExercises.name as Exercise_Name, MuscleGroups.name as Muscle_Group, Types.name as Type, Levels.name as LevelName, TypeLevels.sets, TypeLevels.reps, TypeLevels.restTime
-- FROM WeightExercises
-- INNER JOIN MuscleGroups ON MuscleGroups.muscleGroupID = HIITExercises.muscleGroupID
-- INNER JOIN Types ON Types.typeID = HIITExercises.typeID
-- INNER JOIN TypeLevels ON Types.typeID = TypeLevels.typeID
-- INNER JOIN Levels ON Levels.levelID = TypeLevels.levelID
-- WHERE Levels.name = "Intermediate" AND MuscleGroups.name = "Back"
-- ORDER BY RAND()
-- LIMIT 1;


-- SELECT HIITExercises.name as Exercise_Name, Types.name as Type, Levels.name as LevelName, TypeLevels.sets, TypeLevels.reps, TypeLevels.restTime
-- FROM HIITExercises
-- INNER JOIN Types ON HIITExercises.typeID = Types.typeID
-- INNER JOIN TypeLevels ON TypeLevels.typeID = Types.typeID
-- INNER JOIN Levels ON Levels.levelID = TypeLevels.levelID
-- WHERE Levels.name = "Beginner"
-- ORDER BY RAND()
-- LIMIT 1; 

-- INSERT INTO MICROB_Track(exerciseName, weightLifted, sets, reps, restTime, date)
-- VALUES ("Overhead Press", 24, 45, 66, "4:00"," 2024-02-12");


-- SELECT * FROM MICROB_Track
-- WHERE exerciseName = "Bench Press"
-- ORDER BY date ASC;


-- SELECT COUNT(1)
-- FROM MICROB_Track
-- WHERE exerciseName = "Bench Press";

-- SELECT MICRO_GoalTypes.type, MICRO_Goals.objective, MICRO_Goals.exerciseName, MICRO_Goals.target, MICRO_Goals.targetDate, MICRO_Goals.current, MICRO_Goals.currentDate
-- FROM MICRO_Goals
-- INNER JOIN MICRO_GoalTypes ON MICRO_Goals.goalTypeID = MICRO_GoalTypes.goalTypeID
-- ORDER BY MICRO_Goals.goalTypeID, MICRO_Goals.goalID;

-- SELECT * FROM MICROB_Track
-- ORDER BY date ASC;

-- SELECT exerciseName, weightLifted, sets, reps, restTime, date FROM MICROB_Track
-- ORDER BY date ASC; 

-- CREATE OR REPLACE TABLE MICRO_GoalTypes (
--     goalTypeID int AUTO_INCREMENT NOT NULL,
--     type varchar(50),
--     PRIMARY KEY (goalTypeID)
-- );


-- CREATE OR REPLACE TABLE MICRO_Goals (
--     goalID int AUTO_INCREMENT NOT NULL,
--     goalTypeID int,
--     objective ENUM('Gain', 'Lose'), 
--     pounds int,
--     date DATE,
--     PRIMARY KEY (goalID),
--     FOREIGN KEY (goalTypeID) REFERENCES MICRO_GoalTypes(goalTypeID)
-- );


-- SELECT Levels.name as LevelName, Types.name as TypeName, TypeLevels.sets, TypeLevels.reps, TypeLevels.restTime
-- FROM TypeLevels
-- INNER JOIN Levels ON Levels.levelID = TypeLevels.levelID
-- INNER JOIN Types ON Types.typeID = TypeLevels.typeID;
-- WHERE Levels.name = "Beginner" AND Types.name = "Compound";

-- SELECT WeightExercises.name as Exercise_Name, MuscleGroups.name as Muscle_Group, Types.name as Type, 




-- SELECT *
-- FROM MICRO_Goals
-- ORDER BY currentDate ASC
-- LIMIT 1;



SELECT *,
       DATEDIFF(CURDATE(), currentDate) AS Days_Since_Last_Update
FROM MICRO_Goals
ORDER BY Days_Since_Last_Update DESC
LIMIT 1; 

SELECT *, 
    DATEDIFF(${data.newDate}, currentDate) AS Days_Since_Last_Update 
FROM MICRO_Goals 
ORDER BY Days_Since_Last_Update DESC 
LIMIT 1;