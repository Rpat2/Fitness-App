var express = require('express');
var app = express();
const PORT = 3004;
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


app.get("/tableData", async(req, res)=>{ 

    let userData = "SELECT exerciseName, weightLifted, sets, reps, restTime, date FROM MICROB_Track ORDER BY date ASC;"
    let userDataToSend = await executeQuery(userData);

    res.send(userDataToSend)

});




app.post('/trackProg', async(req, res)=> {
    
    data = req.body
    let weightData;
    let setData;
    let repData; 
    let otherMessage;

    // Insert the user data into the database 
    let newInput = `INSERT INTO MICROB_Track( exerciseName, weightLifted, sets, reps, restTime, date) VALUES ('${data.name}', ${data.weight}, ${data.sets}, ${data.reps}, '${data.rest}', '${data.date}')`
    let insert = await executeQuery(newInput);
    

    let check = `SELECT COUNT(1)
                FROM MICROB_Track
                WHERE exerciseName = '${data.name}';`
    
    let getCount = await executeQuery(check);

    let countExercise = getCount[0]['COUNT(1)']
    
    if (countExercise >= 2) { 


        let getData = `SELECT * FROM MICROB_Track
        WHERE exerciseName = '${data.name}'
        ORDER BY date ASC`

        let getDataQuery = await executeQuery(getData);

        
        let lastTwo = getDataQuery.slice(-2); 
        


        for (let i = 0; i<1; i++ ){
        let weightDiff = lastTwo[i+1].weightLifted - lastTwo[i].weightLifted
        let setDiff = lastTwo[i+1].sets - lastTwo[i].sets
        let repDiff = lastTwo[i+1].reps - lastTwo[i].reps

        if (weightDiff > 0) {
            weightData = `You increased your ${data.name} by ${weightDiff} pounds compared to your previous workout` 
        } else if (weightDiff == 0) {
            weightData = `Your ${data.name} stayed the same compared to your previous workout`
        } else {
            weightData =`Your ${data.name} decreased by ${weightDiff} pounds compared to your previous workout `
        }


        if (setDiff > 0) {
            setData = `You increased your sets by ${setDiff} for ${data.name} compared your previous workout`
        } else if (setDiff ==0) {
            setData = `The number of sets you peformed for ${data.name} stayed the same compared your previous workout`
        } else {
            setData = `You decreased in the number of sets performed for ${data.name} by ${setDiff}`
        }



        if (repDiff > 0) {
            repData = `You increased your reps by ${repDiff} for ${data.name} compared your previous workout`
        } else if (repDiff ==0) {
            repData = `The number of reps you peformed for ${data.name} stayed the same compared your previous workout`
        } else {
            repData = `You decreased in the number of reps performed for ${data.name} by ${repDiff}`
        }
    
        }
       
        res.json({weightData, repData, setData});

    } 
    else {
        otherMessage = "This is your first time entering this exercise"
        res.json({otherMessage});
    }



});




app.listen(PORT, () => {
    console.log('Track Progress service started on http://localhost:' + PORT);
});

