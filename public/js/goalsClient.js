const firstSelectionWeight= document.getElementById("weight")
const firstSelectionStrength = document.getElementById("strength")
const weightForm = document.getElementById("WeightForm");
const strengthForm = document.getElementById("StrengthForm");
const goalButton = document.getElementById("sendGoalData");
const firstForm = document.getElementById("firstSelection");
const updateForm = document.getElementById("updateForm");
const updateButton = document.getElementById("updateGoalData");


firstSelectionWeight.addEventListener("click", function() {
    weightForm.style.display = "block";
    strengthForm.style.display = "none";
})

firstSelectionStrength.addEventListener("click", function() {
    weightForm.style.display = "none";
    strengthForm.style.display = "block";
})


goalButton.addEventListener("click", async ()=> {
    try {

        let formData = new FormData(firstForm); 

        const selection = formData.get("options");
        
        if (selection == "Weight") {
            let weightFormData = new FormData(weightForm);

            //.get gets the name value of the form and stores its value in the variable.

            let goalTypeID = 1;
            let objective = weightFormData.get("objective");
            let targetWeight = weightFormData.get("targetWeight");
            let targetDateW = weightFormData.get("targetDateW");
            let currentWeight = weightFormData.get("currentWeight");
            let currentDateW = weightFormData.get("currentDateW");

            //Make a HTTP POST request to the Goals Service 
            const response = await fetch("http://localhost:3012/storeGoals", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                 },
                body: JSON.stringify({goalTypeID, objective, targetWeight, targetDateW, currentWeight, currentDateW})
            });

        }

        if (selection == "Strength") {
            let strengthFormData = new FormData(strengthForm);

            let goalTypeID = 2;
            let exerciseName = strengthFormData.get("exerciseName");
            let targetStrength = strengthFormData.get("targetStrength");
            let targetDateS = strengthFormData.get("targetDateS");
            let currentStrength = strengthFormData.get("currentStrength");
            let currentDateS = strengthFormData.get("currentDateS");


            const response = await fetch("http://localhost:3012/storeGoals", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                 },
                body: JSON.stringify({goalTypeID, exerciseName, targetStrength, targetDateS, currentStrength, currentDateS})
            });

        }
        const tableResponse = await fetch("http://localhost:3012/goalData");
        const tableData = await tableResponse.json();
        // console.log(tableData);
        updateTable(tableData);
        updateDropdown(tableData);


    
    }

    catch (error) {
        console.log(error);
    }


});


updateButton.addEventListener("click", async(req, res) => {

    try {

        let updateFormData = new FormData(updateForm);
        let goalID = updateFormData.get("goalSelect");
        let newWeight = updateFormData.get("newCurrentWeight");
        let newDate = updateFormData.get("newCurrentDate");
        
       
        
        // Make a POST request to the goals microservice. 
        const response = await fetch("http://localhost:3012/updateGoals", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
             },
            body: JSON.stringify({goalID, newWeight, newDate})
        });

        //Get data back from the microservice in a response object
        const fomattedData = await response.json();
        

        alert(fomattedData.notificationString);
        reminder = document.getElementById("reminder");
        reminder.innerHTML = fomattedData.reminderString;

       


        const tableResponse = await fetch("http://localhost:3012/goalData");
        const tableData = await tableResponse.json();
        updateTable(tableData);
        updateDropdown(tableData);

        

        

    }

    catch(error) {
        console.log(error);
    }
})


function updateDropdown(data) {
    const dropDown = document.getElementById("goalDropDown");

    dropDown.innerHTML = "";

    data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.goalID;
        option.text = `${item.type} ${item.objective} ${item.exerciseName || ""} My Goal is ${item.target} by ${item.targetDate}. My Current weight is ${item.current}`;
        dropDown.appendChild(option);
    });
}






function updateTable(data) {
    const table = document.getElementById("GoalTable");
    const tbody = table.querySelector("tbody");
    const firstForm = document.getElementById("firstSelection");
    const weightForm = document.getElementById("WeightForm");
    const strengthForm = document.getElementById("StrengthForm");
    const updateForm = document.getElementById("updateForm");

    //Reset the form
    firstForm.reset();
    weightForm.reset();
    strengthForm.reset();
    updateForm.reset();

    //Reset the body of the table 
    tbody.innerHTML = "";
    
    //Enter new data in for table and insert a new row. 
    data.forEach((row) => {
        const newRow = `
            <tr>
                <td>${row.type}</td>
                <td>${row.objective}</td>
                <td>${row.exerciseName || ""}</td>
                <td>${row.target}</td>
                <td>${row.targetDate}</td>
                <td>${row.current}</td>
                <td>${row.currentDate}</td>
            </tr>
        `;
        tbody.innerHTML += newRow;
    });

}