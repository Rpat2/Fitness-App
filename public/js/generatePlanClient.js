// will make a post request to the generate plan microservice 
// Will then display the data in a table and display it to the user by manipulating HTML elements?


let secondForm = document.getElementById("secondForm");
let thirdForm = document.getElementById("thirdForm");
let allButtonsFirstForm = document.querySelectorAll(".press");
let weightOption = document.getElementById("weights");
let hiitOption = document.getElementById("HIIT");


for (let i =0; i < allButtonsFirstForm.length; i++) { 

    allButtonsFirstForm[i].addEventListener("click", function() {
        secondForm.style.display = "block";
    })
}

weightOption.addEventListener("click", function (){
    thirdForm.style.display = "block";
})

hiitOption.addEventListener("click", function(){
    thirdForm.style.display = "none";
})


document.getElementById("sendData").addEventListener("click", async()=>{
    try {

        let level = document.querySelector('input[name="options"]:checked').value;

        let type = document.querySelector('input[name="workoutType"]:checked').value

        let musclegroupsSelection = document.querySelectorAll('input[name=muscle]:checked');

        let muscleGroups = [];

        for (let i=0; i<musclegroupsSelection.length; i++) {
            muscleGroups.push(musclegroupsSelection[i].value);
        }
        
        // Make a post request to the generate Plan service 
        const response = await fetch('http://localhost:3002/generatePlan', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({level, type, muscleGroups})
        });
        

        const fomattedData = await response.json();

        //flat() converts a 2D list into a 1D list 
        const flatData = fomattedData.flat();
       


        resultTable = document.getElementById("ResultTable")
        resultTableHIIT = document.getElementById("ResultTableHIIT")

        //Dynamically add rows to the HTML based on the data.
        if (flatData[0].Type == "HIIT") {

            flatData.forEach(flatData => {
                const row = resultTableHIIT.insertRow();
                row.innerHTML = 
                    `
                    <td>${flatData.Exercise_Name}</td>
                    <td>${flatData.sets}</td>
                    <td>${flatData.reps}</td>
                    <td>${flatData.restTime}</td>
                    `
                    
            });

            resultTableHIIT.style.display = "block";

        }

        else {
            flatData.forEach(flatData => {
                const row = resultTable.insertRow();
                row.innerHTML = 
                    `
                    <td>${flatData.Exercise_Name}</td>
                    <td>${flatData.Muscle_Group}</td>
                    <td>${flatData.sets}</td>
                    <td>${flatData.reps}</td>
                    <td>${flatData.restTime}</td>
                    `
                    
            });
            resultTable.style.display = "block";
    

        }
        

    }
    catch(error){
        console.log(error);
    }


})

