var express = require('express');
var app = express();
const PORT = 3002;
app.use(express.json()); 


//I needed cors since the browser needed permissions to call the API. 
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


app.post('/generatePlan', async(req, res)=>{


    data = req.body;
  

    muscleGroupList = req.body.muscleGroups;
    typeSelection = req.body.type;
    levelSelection = req.body.level;
    let counter = 0;
    const finalList = []
    const exerciseNames = []

   
    
    if (typeSelection == "Weights") {

        while (finalList.length < 4) {
            for (let i = 0; i<muscleGroupList.length; i++) {
    
                let exercise = `SELECT WeightExercises.name as Exercise_Name, MuscleGroups.name as Muscle_Group, Types.name as Type, Levels.name as LevelName, TypeLevels.sets, TypeLevels.reps, TypeLevels.restTime
                                FROM WeightExercises
                                INNER JOIN MuscleGroups ON MuscleGroups.muscleGroupID = WeightExercises.muscleGroupID
                                INNER JOIN Types ON Types.typeID = WeightExercises.typeID
                                INNER JOIN TypeLevels ON Types.typeID = TypeLevels.typeID
                                INNER JOIN Levels ON Levels.levelID = TypeLevels.levelID 
                                WHERE Levels.name = '${levelSelection}' AND MuscleGroups.name = '${data.muscleGroups[i]}'
                                ORDER BY RAND()
                                LIMIT 1;`

            let test = await executeQuery(exercise);
            

            if (!exerciseNames.includes(test[0].Exercise_Name)){
                finalList.push(test);
                exerciseNames.push(test[0].Exercise_Name);
            }
           
            if (finalList.length == 4){
                break;
            }
             
            }
            // console.log(exerciseNames);
            // console.log(finalList);
        }
        
    }


    if (typeSelection == "HIIT") {
    

        while (finalList.length <4 ) {

            for (let i = 0; i<4; i++) {

                let exercise = `SELECT HIITExercises.name as Exercise_Name, Types.name as Type, Levels.name as LevelName, TypeLevels.sets, TypeLevels.reps, TypeLevels.restTime
                                FROM HIITExercises
                                INNER JOIN Types ON HIITExercises.typeID = Types.typeID
                                INNER JOIN TypeLevels ON TypeLevels.typeID = Types.typeID
                                INNER JOIN Levels ON Levels.levelID = TypeLevels.levelID
                                WHERE Levels.name = '${levelSelection}'
                                ORDER BY RAND()
                                LIMIT 1;`
    
                let test = await executeQuery(exercise);
    
                if (!exerciseNames.includes(test[0].Exercise_Name)){
                    finalList.push(test);
                    exerciseNames.push(test[0].Exercise_Name);
                }
                
                if (finalList.length == 4){
                    break;
                }
        }

        }
        

        // console.log(exerciseNames);
        // console.log(finalList);


    }

    res.json(finalList);

   



});











app.listen(PORT, () => {
    console.log('Generate Workout service started on http://localhost:' + PORT);
});

