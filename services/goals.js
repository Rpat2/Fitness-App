var express = require('express');
var app = express();
const PORT = 3012;
app.use(express.json()); 

var cors = require('cors');  
app.use(cors());

var db = require('../database/db-connector')



function executeQuery(query) {
    return new Promise((resolve, reject) => {
        db.pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);

        });
    });
}



app.get('/goalData', async(req,res) => {
    let userData = "SELECT MICRO_Goals.goalID, MICRO_GoalTypes.type, MICRO_Goals.objective, MICRO_Goals.exerciseName, MICRO_Goals.target, MICRO_Goals.targetDate, MICRO_Goals.current, MICRO_Goals.currentDate FROM MICRO_Goals INNER JOIN MICRO_GoalTypes ON MICRO_Goals.goalTypeID = MICRO_GoalTypes.goalTypeID ORDER BY MICRO_Goals.goalTypeID, MICRO_Goals.goalID;"

    let userGoalData = await executeQuery(userData);
    res.send(userGoalData);

    
})


app.post('/storeGoals', async(req, res)=> {

    let userSelection = req.body;

    if (userSelection.goalTypeID == 1) {
        

        // In SQL string to number conversion is automatic. So '241' is converted to 241 when it gets inserted.
        // But strings must be wrapped in quotes to makes sure the value is interpurted as a string
        // No quotes then SQL might think its a column name, or SQL keyword. 
        let newInput = `INSERT INTO MICRO_Goals(goalTypeID, objective, target, targetDate, current, currentDate ) VALUES (${userSelection.goalTypeID},'${userSelection.objective}', ${userSelection.targetWeight}, '${userSelection.targetDateW}', ${userSelection.currentWeight}, '${userSelection.currentDateW}')`
        let inputQuery = await executeQuery(newInput);
    }

    if (userSelection.goalTypeID == 2 ) {


        let strengthGoal = `INSERT INTO MICRO_Goals(goalTypeID, objective, exerciseName,target, targetDate, current, currentDate) VALUES (${userSelection.goalTypeID}, "Increase", '${userSelection.exerciseName}', ${userSelection.targetStrength}, '${userSelection.targetDateS}', ${userSelection.currentStrength}, '${userSelection.currentDateS}')` 

        let inputStrength = await executeQuery(strengthGoal);



    }
    
    res.send("got the data");


})


app.post('/updateGoals', async(req, res)=> {

    data = req.body;
    let notificationString;
    let reminderString; 
 

    //Get the old goal data before updating 
    let oldWeightStatement = `SELECT * FROM MICRO_Goals WHERE goalID = ${data.goalID}`;
    let oldData = await executeQuery(oldWeightStatement);

    // console.log(oldData[0].currentDate);
    
    

    //Update the goal
    let updateRowStatement = `UPDATE MICRO_Goals SET current = ${data.newWeight}, currentDate = '${data.newDate}' WHERE goalID = ${data.goalID}`
    let updateRow = await executeQuery(updateRowStatement);


    // Get the new goal information
    let targetStatemet = `SELECT * FROM MICRO_Goals WHERE goalID = ${data.goalID}`;
    let target = await executeQuery(targetStatemet);
    

    //Calcualte the different between the old and new weight 
    let diff = Math.abs(data.newWeight - oldData[0].current);
    
    //Get the remainder until goal is met. 
    let remain = Math.abs(target[0].target - data.newWeight);

    

    //Check what type of goal the user is trying to update 
    if (oldData[0].goalTypeID == 2) {
        notificationString = `You have increased your ${target[0].exerciseName} by ${diff} pounds. Only ${remain} more pounds until you reach your goal PR!`
        console.log(notificationString); 
    }

    if (oldData[0].goalTypeID == 1) {
       
        if (oldData[0].objective == "Gain") {

            notificationString = `You have gained ${diff} pounds. Only ${remain} more pounds to go until you reach your goal weight!  `
            console.log(notificationString);
        }

        if (oldData[0].objective == "Lose") {
            notificationString = `You have lost ${diff} pounds. Only ${remain} more pounds to go until you reach your goal weight!`
        }
    }


    //Reminders 

    // Take the current date and find which goal has been updated in the longest time. 
    // console.log(data.newDate);
    let dateStatement = `SELECT *, DATEDIFF('${data.newDate}', currentDate) AS Days_Since_Last_Update FROM MICRO_Goals ORDER BY Days_Since_Last_Update DESC LIMIT 1;`

    let getDate = await executeQuery(dateStatement);
    console.log(getDate);

    let lastUpdate = getDate[0].Days_Since_Last_Update

    // console.log(lastUpdate);

    
    if (getDate[0].goalTypeID == 1) {
        //Then its a body weight goal

        reminderString = `Update Reminder: It has been ${lastUpdate} days since you updated your ${getDate[0].objective} Weight goal where your target weight is ${getDate[0].target} and your current weight is ${getDate[0].current}` 

        console.log(reminderString);

    }

    if (getDate[0].goalTypeID == 2) {
        //Then its a strength goal 

        reminderString = `Update Reminder: It has been ${lastUpdate} days since you updated your PR goal for ${getDate[0].exerciseName}. Your target PR is ${getDate[0].target} and your current PR is ${getDate[0].current}`
        console.log(reminderString);
    }
    // It has been x days since you updated your (objective) weight goal. 
    
    // It has been x days since you updated your PR goal for (exerciseName).


    // Get all the dates of the goals order by asc/decs. 
    // Find which one has not been updated in the longest time. 



    //Send back the notification telling the user how much they have until the goal is met. 
    res.json({notificationString, reminderString});

    



   

})




app.listen(PORT, () => {
    console.log('Goal service started on http://localhost:' + PORT);
});

