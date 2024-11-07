-- This is mySQL database that has 2 tables Quotes and FitnessTips with data inserted in both of them. 


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
("Some healthy sources of fats include walnuts, almonds, seeds, milk, olive oil, eggs ")



-- SELECT statement,author FROM Quotes ORDER BY RAND() LIMIT 1; 

-- SELECT statement FROM FitnessTips ORDER BY RAND() LIMIT 1;