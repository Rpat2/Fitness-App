var express = require('express');
var app = express();
const PORT = 3008;
app.use(express.json()); 


var cors = require('cors');  
app.use(cors());


//Function from geeksforgeeks.org 
function jsonToCsv(jsonData) {
    let csv = '';
    
    // Extract headers
    const headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    
    // Extract values
    jsonData.forEach(obj => {
        const values = headers.map(header => obj[header]);
        csv += values.join(',') + '\n';
    });
    
    return csv;
}

// Convert JSON
// Endpoint that accepts JSON data and converts it to the CSV format 
// Send back the data in CSV format 

app.post('/convertCSV', async(req, res) => {

    dataRecieved = req.body;

    let csvData = jsonToCsv(dataRecieved);


    res.send(csvData)

});




app.listen(PORT, () => {
    console.log('Convert CSV service started on http://localhost:' + PORT);
});

