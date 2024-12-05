-- This is mySQL database that has 2 tables Quotes and FitnessTips with data inserted in both of them. 

DROP TABLE IF EXISTS Quotes;
DROP TABLE IF EXISTS FitnessTips;
DROP TABLE IF EXISTS MuscleGroups;
DROP TABLE IF EXISTS Complexities;
DROP TABLE IF EXISTS Types;
DROP TABLE IF EXISTS Excercises;

CREATE OR REPLACE TABLE Quotes(
    quoteID int NOT NULL AUTO_INCREMENT,
    statement varchar(250) NOT NULL,
    author varchar(50) NOT NULL,
    PRIMARY KEY(quoteID)
);

INSERT INTO Quotes(statement, author)
VALUES 
("You've survived 100 percent of your worst days", "Robin Arzón"), 
("We are what we repeatedly do. Excellence then is not an act but a habit.", "Aristotle"),
("He who says he can and he who says he can't, are both usually right", "Henry Ford"),
("We’re either getting better or we’re getting worse.", "David Goggins"),
("Discipline is the only thing in this world that will change your DNA", "David Goggins"), 
("When the ending is unknown and the distance is unknown that's when you learn who you are", "David Goggins"),
("Second by second you lose the opportunity to become the person you want to be.", "Greg Plitt"),
("All growth starts at the end of your comfort zone.", "Tony Robbins"),
("Most people fail, not because of lack of desire, but, because of lack of commitment", "Vince Lombard"),
("You can either suffer the pain of discipline or the pain of regret.", "Jim Rohn"),
("The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"),
("Motivation is what gets you started. Habit is what keeps you going.", "Jim Ryun"),
("Perseverance will take you farther than talent ever could", "Unknown"); 


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
VALUES ("Chest"),("Shoulders"),("Back"), ("Arms"), ("Lower Body");


CREATE OR REPLACE TABLE Complexities(
    complexityID int AUTO_INCREMENT NOT NULL,
    name varchar(20) ,
    PRIMARY KEY(complexityID)
);

INSERT INTO Complexities(name) 
VALUES ("Compound"),("Isolation");

CREATE OR REPLACE TABLE Types(
    typeID int AUTO_INCREMENT NOT NULL,
    name varchar(20) ,
    PRIMARY KEY(typeID)
);

INSERT INTO Types(name) 
VALUES ("Weight Lifting"),("HITT");

CREATE OR REPLACE TABLE Exercises(
    exerciseID int AUTO_INCREMENT NOT NULL,
    name varchar(50),
    muscleGroupID int, 
    complexityID int, 
    typeID int, 
    PRIMARY KEY (exerciseID),
    FOREIGN KEY (muscleGroupID) REFERENCES MuscleGroups(muscleGroupID),
    FOREIGN KEY (complexityID) REFERENCES Complexities(complexityID),
    FOREIGN KEY (typeID) REFERENCES Types(typeID)
);




INSERT INTO Exercises(name, muscleGroupID, complexityID, typeID)
VALUES
("Overhead Press", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Shoulders"), (SELECT complexityID FROM Complexities WHERE name = "Compound"), (SELECT typeID FROM Types WHERE name = "Weight Lifting")),
("Bench Press", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Chest"), (SELECT complexityID FROM Complexities WHERE name = "Compound"), (SELECT typeID FROM Types WHERE name = "Weight Lifting")),
("Bent Over Rows", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Back"), (SELECT complexityID FROM Complexities WHERE name = "Compound"), (SELECT typeID FROM Types WHERE name = "Weight Lifting")),
("Bicep Curls", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Arms"), (SELECT complexityID FROM Complexities WHERE name = "Isolation"), (SELECT typeID FROM Types WHERE name = "Weight Lifting")),
("Tricep Extensions", (SELECT muscleGroupID FROM MuscleGroups WHERE name ="Arms"), (SELECT complexityID FROM Complexities WHERE name = "Isolation"), (SELECT typeID FROM Types WHERE name = "Weight Lifting"));



-- SELECT statement,author FROM Quotes ORDER BY RAND() LIMIT 1; 

-- SELECT statement FROM FitnessTips ORDER BY RAND() LIMIT 1;