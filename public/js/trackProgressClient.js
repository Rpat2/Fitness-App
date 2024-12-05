

form = document.getElementById("testForm");

document.getElementById("sendTrackData").addEventListener("click", async ()=>{

    try {
        var formData = new FormData(form)

        //Same as the name attribute in the form 

        //Check the user did not enter a number for the name. 
        let name = formData.get("name")
        if (isNaN(name)) {
            //Nothing. 
        }else {
            throw new Error("You entered a number")
        }
        let weight = Number(formData.get("weight"))
        let sets = Number(formData.get("sets"))
        let reps = Number(formData.get("reps"))
        let rest = formData.get("rest")
        let date = new Date(formData.get("date"))
    
    
        //Now this will send a POST request to the track progress micorservice
        const response = await fetch("http://localhost:3004/trackProg", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
             },
            body: JSON.stringify({name, weight, sets, reps, rest, date})
        });
    
        // console.log(response)
        if(!response.ok) {
            throw new Error("Could not fetch resource")
        }
        
        
        const fomattedData = await response.json();
        // console.log(fomattedData);



        if (fomattedData.weightData) {
            document.getElementById("weightProgress").innerHTML = fomattedData.weightData
            document.getElementById("otherData").innerHTML = ""
        }
        if (fomattedData.setData) {
            document.getElementById("setProgress").innerHTML = fomattedData.setData
            document.getElementById("otherData").innerHTML = ""
        }
        if (fomattedData.repData) {
            document.getElementById("repProgress").innerHTML = fomattedData.repData
            document.getElementById("otherData").innerHTML = ""
        }
        
        if (fomattedData.otherMessage) {
            document.getElementById("otherData").innerHTML = fomattedData.otherMessage
        }

        const tableResponse = await fetch("http://localhost:3004/tableData");
        const tableData = await tableResponse.json();
        console.log(tableData)
        updateTable(tableData);



    }
    catch(error) {
        console.log(error)
    }


});


function updateTable(data) {
    const table = document.getElementById("WorkoutsTable");
    const tbody = table.querySelector("tbody");
    const form = document.getElementById("testForm");
    
    //Reset the form
    form.reset();
    //Reset the body of the table 
    tbody.innerHTML = "";
    
    //Enter new data in for table and insert a new row. 
    data.forEach((row) => {
        const newRow = `
            <tr>
                <td>${row.exerciseName}</td>
                <td>${row.weightLifted}</td>
                <td>${row.sets}</td>
                <td>${row.reps}</td>
                <td>${row.restTime}</td>
                <td>${row.date}</td>
            </tr>
        `;
        tbody.innerHTML += newRow;
    });

    
}