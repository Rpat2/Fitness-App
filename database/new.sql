-- This is mySQL database that has 2 tables Quotes and FitnessTips with data inserted in both of them. 

DROP TABLE IF EXISTS Quotes;
DROP TABLE IF EXISTS FitnessTips;
DROP TABLE IF EXISTS WeightExercises;
DROP TABLE IF EXISTS HIITExercises;
DROP TABLE IF EXISTS MuscleGroups;
DROP TABLE IF EXISTS TypeLevels; 
DROP TABLE IF EXISTS Types;
DROP TABLE IF EXISTS Levels;
DROP TABLE IF EXISTS MICRO_Goals;
DROP TABLE IF EXISTS MICRO_GoalTypes;



-- CREATE OR REPLACE TABLE Quotes(
--     quoteID int NOT NULL AUTO_INCREMENT,
--     statement varchar(250) NOT NULL,
--     author varchar(50) NOT NULL,
--     PRIMARY KEY(quoteID)
-- );

-- INSERT INTO Quotes(statement, author)
-- VALUES 
-- ("You've survived 100 percent of your worst days", "Robin Arzón"), 
-- ("We are what we repeatedly do. Excellence then is not an act but a habit.", "Aristotle"),
-- ("He who says he can and he who says he can't, are both usually right", "Henry Ford"),
-- ("We’re either getting better or we’re getting worse.", "David Goggins"),
-- ("Discipline is the only thing in this world that will change your DNA", "David Goggins"), 
-- ("When the ending is unknown and the distance is unknown that's when you learn who you are", "David Goggins"),
-- ("Second by second you lose the opportunity to become the person you want to be.", "Greg Plitt"),
-- ("All growth starts at the end of your comfort zone.", "Tony Robbins"),
-- ("Most people fail, not because of lack of desire, but, because of lack of commitment", "Vince Lombard"),
-- ("You can either suffer the pain of discipline or the pain of regret.", "Jim Rohn"),
-- ("The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"),
-- ("Motivation is what gets you started. Habit is what keeps you going.", "Jim Ryun"),
-- ("Perseverance will take you farther than talent ever could", "Unknown"); 


CREATE OR REPLACE TABLE FitnessTips(
    fittnessTipID int AUTO_INCREMENT,
    statement varchar(200),
    PRIMARY KEY(fittnessTipID)
);


INSERT INTO FitnessTips(statement)
VALUES 
("Improving your physique is 80% diet and 20% working out."),
("Track your calories using Calorie Counter apps so you can see how many calories you are eating."),
("Sleep is an essential part of muscle recovery."),
("On the bench press, it is important to keep your chest up and shoulders back to avoid injuring your shoulders. "),
("Be sure to warm up with lighter weights before going onto your working sets. "),
("Chest, shoulder, and tricep exercises are generally grouped together in one workout called a Push day"), 
("Back and biceps exercises are generally grouped together in one workout called a Pull Day"),
("To lose weight: Find your maintenance calories using an online calculator, then eat 300-500 calories less than that number. Large calorie deficits will affect your energy levels. "),
("Some healthy sources of carbs include: Quinoa, potatoes, beans, oats, fruits"),
("Some healthy sources of protein include: Chicken, Greek yogurt, eggs, red meat, fish"),
("Some healthy sources of fats include walnuts, almonds, seeds, milk, olive oil, eggs ");


CREATE OR REPLACE TABLE MuscleGroups(
    muscleGroupID int AUTO_INCREMENT NOT NULL,
    name varchar(20) ,
    PRIMARY KEY(muscleGroupID)
);

INSERT INTO MuscleGroups(name) 
VALUES ("Chest"),("Shoulders"),("Back"), ("Biceps"),("Triceps"), ("Lower Body");


CREATE OR REPLACE TABLE Types(
    typeID int AUTO_INCREMENT NOT NULL,
    name varchar(20) ,
    PRIMARY KEY(typeID)
);

INSERT INTO Types(name) 
VALUES ("Compound"),("Isolation"), ("HIIT");


CREATE OR REPLACE TABLE WeightExercises(
    weightExerciseID int AUTO_INCREMENT NOT NULL,
    name varchar(50),
    muscleGroupID int, 
    typeID int,  
    PRIMARY KEY (weightExerciseID),
    FOREIGN KEY (muscleGroupID) REFERENCES MuscleGroups(muscleGroupID),
    FOREIGN KEY (typeID) REFERENCES Types(typeID)
);


CREATE OR REPLACE TABLE HIITExercises(
    hiitExerciseID int AUTO_INCREMENT NOT NULL,
    name varchar(50),
    typeID int DEFAULT 3,   
    PRIMARY KEY (hiitExerciseID),
    FOREIGN KEY (typeID) REFERENCES Types(typeID)
);

CREATE OR REPLACE TABLE Levels(
    levelID int AUTO_INCREMENT NOT NULL,
    name varchar(20),
    PRIMARY KEY(levelID)
);

CREATE OR REPLACE TABLE TypeLevels(
    typeLevelID int AUTO_INCREMENT NOT NULL,
    levelID int NOT NULL,
    typeID int NOT NULL,
    sets varchar(10),
    reps varchar(10),
    restTime varchar(10),
    PRIMARY KEY(typeLevelID),
    FOREIGN KEY (levelID) REFERENCES Levels(levelID),
    FOREIGN KEY (typeID) REFERENCES Types(typeID)
);


INSERT INTO WeightExercises(name, muscleGroupID, typeID)
VALUES
("Overhead Press", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Shoulders"), (SELECT typeID FROM Types WHERE name = "Compound")),
("Bench Press", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Chest"), (SELECT typeID FROM Types WHERE name = "Compound")),
("Bent Over Rows", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Back"), (SELECT typeID FROM Types WHERE name = "Compound")),
("Bicep Curls", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Biceps"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Tricep Extensions", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Triceps"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Incline Bench Press", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Chest"), (SELECT typeID FROM Types WHERE name = "Compound")),
("Pec Dec Flys", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Chest"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Chest Supported Rows", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Back"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Pull Ups", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Back"), (SELECT typeID FROM Types WHERE name = "Compound")),
("Lat Pull Downs", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Back"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Lateral Raises", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Shoulders"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Incline Dumbell Curls", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Biceps"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("EZ-bar Curls", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Biceps"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Overhead Tricep Extensions", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Triceps"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("EZ=bar Skull Crushers", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Triceps"), (SELECT typeID FROM Types WHERE name = "Isolation")),
("Rear-Delt Flys", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Shoulders"), (SELECT typeID FROM Types WHERE name = "Isolation")); 






INSERT INTO HIITExercises(name)
VALUES
("Burpees"),
("Mountain Climbers"), 
("High Knees"), 
("Jump Squats"), 
("Walking Lunges"), 
("Push Ups"), 
("Russian Twists"),
("Bicycle Crunches"),
("Box Jumps"),
("Jump Rope"),
("Body-Weight Squats"),
("Reverse Crunch");



INSERT INTO Levels(name)
VALUES("Beginner"), ("Intermediate"), ("Advanced");


INSERT INTO TypeLevels(levelID, typeID, sets, reps, restTime)
VALUES 
((SELECT levelID FROM Levels WHERE name = "Beginner"), (SELECT typeID FROM Types WHERE name = "Compound"), "2", "6-8", "2:45"), 
((SELECT levelID FROM Levels WHERE name = "Intermediate"), (SELECT typeID FROM Types WHERE name = "Compound"), "3", "8-10", "2:30"),
((SELECT levelID FROM Levels WHERE name = "Advanced"), (SELECT typeID FROM Types WHERE name = "Compound"), "4", "10-12", "2:00"),

((SELECT levelID FROM Levels WHERE name = "Beginner"), (SELECT typeID FROM Types WHERE name = "Isolation"), "1-2", "6-10", "2:00"),
((SELECT levelID FROM Levels WHERE name = "Intermediate"), (SELECT typeID FROM Types WHERE name = "Isolation"), "2-3", "8-10", "1:30"),
((SELECT levelID FROM Levels WHERE name = "Advanced"), (SELECT typeID FROM Types WHERE name = "Isolation"), "3-4", "10-12", "1:00"),


((SELECT levelID FROM Levels WHERE name = "Beginner"), (SELECT typeID FROM Types WHERE name = "HIIT"), "2","30", "45" ),
((SELECT levelID FROM Levels WHERE name = "Intermediate"), (SELECT typeID FROM Types WHERE name = "HIIT"), "2-3","40", "30" ),
((SELECT levelID FROM Levels WHERE name = "Advanced"), (SELECT typeID FROM Types WHERE name = "HIIT"), "3","50", "25" );








CREATE OR REPLACE TABLE MICROB_Track(
    trackID int AUTO_INCREMENT NOT NULL, 
    exerciseName varchar(50),
    weightLifted int,
    sets int, 
    reps int, 
    restTime varchar(30), 
    date DATE, 
    PRIMARY KEY (trackID)
);


INSERT INTO MICROB_Track(exerciseName, weightLifted, sets, reps, restTime, date)
VALUES ("Bench Press", 135, 3, 5, "1:35", "2024-11-20"),
("Overhead Press", 120, 3, 5, "1:50", "2024-11-20"), 
("Tricep Extensions", 20, 3, 5, "1:00", "2024-11-20"), 
("Lateral Raises", 15, 3, 5, "1:20", "2024-11-20"),

("Bench Press", 155, 5, 5, "2:00", "2024-11-25"),
("Overhead Press", 125, 5, 5, "1:50", "2024-11-25"), 
("Tricep Extensions", 30, 3, 5, "1:00", "2024-11-25"), 
("Lateral Raises", 15, 5, 8, "1:20", "2024-11-25");



CREATE OR REPLACE TABLE MICRO_GoalTypes (
    goalTypeID int AUTO_INCREMENT NOT NULL,
    type varchar(50),
    PRIMARY KEY (goalTypeID)
);


CREATE OR REPLACE TABLE MICRO_Goals (
    goalID int AUTO_INCREMENT NOT NULL,
    goalTypeID int,
    objective varchar(50), 
    exerciseName varchar(50),
    target int,
    targetDate DATE,
    current int, 
    currentDate DATE, 
    PRIMARY KEY (goalID),
    FOREIGN KEY (goalTypeID) REFERENCES MICRO_GoalTypes(goalTypeID)
);


INSERT INTO MICRO_GoalTypes(type) 
VALUES ("Weight"), ("Strength");


INSERT INTO MICRO_Goals(goalTypeID, objective, exerciseName, target, targetDate, current, currentDate)
VALUES (2, "Increase", "Bench Press", 150,"2024-11-25", 135, "2024-11-09");

INSERT INTO MICRO_Goals(goalTypeID, objective, target, targetDate, current, currentDate)
VALUES (1, "Gain", 180,"2024-12-20", 165, "2024-11-12");

INSERT INTO MICRO_Goals(goalTypeID, objective, target, targetDate, current, currentDate)
VALUES (1, "Lose", 160,"2024-12-20", 200, "2024-11-13");