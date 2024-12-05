
var express = require('express');   
var app     = express();            

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');  
app.use(express.static('public'));
PORT        = 3023;                


// Connect to the SQL database 
var db = require('./database/db-connector')
      



//This function is called when you want to execute a query. 
//It returns a new promise object. This object promises to return a value. 
//It queries mySQL database and gets the results of that query back. 
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



// Get the index page. 
app.get('/', (req, res) => {
    res.render('index');
});



//Generate Workout Microservice 
app.get('/generate', (req, res) => {
    res.render('generate');
    
});



//Make downloadable CSV file microservice. 
app.get('/csv', async (req, res) => {
    
    //Get the workout data from the Track Progress service using HTTP requests. 
    workoutData = await fetch("http://localhost:3004/tableData");


    data = await workoutData.json()
    // data is in JSON and we can now send it to the csv microserivce that will convert it to csv format 
    

    //Make a POST request to the csv microservice and send te data we got back from Track progress. 
    const getCSV = await fetch("http://localhost:3008/convertCSV", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)
    });

    csvFormat = await getCSV.text();
    res.render('csv', {csvData: csvFormat});

    
});

// Track progress service. 
app.get('/track', async (req, res)=> {

    const response = await fetch("http://localhost:3004/tableData");

    data = await response.json();

    res.render('track', {data:data});


})



// Set and Manage Goals Service. 
app.get('/goals', async(req, res) => {

    const response = await fetch("http://localhost:3012/goalData");
    
    goalData = await response.json();
    // console.log(goalData);

    res.render('goals', {data:goalData}); 
})


// path for getting a quote
//Uses async and await. Async makes a function return a promise. Await makes an async function wait for a promise. 
//When a quote is requested it will query the database and respond with a quote in JSON.
app.get('/new-quote', async (req, res) => {
    let newQuoteQuery = "SELECT statement, author FROM Quotes ORDER BY RAND() LIMIT 1";

    try {
        let quoteRows = await executeQuery(newQuoteQuery);  //Wait for the promise 
        

        // Send the new quote as JSON
        
        res.json({
            quote: quoteRows[0]
        });

        
        //Catch any errors 
    } catch (error) {
        console.error(error);
    }
});



// Path for getting a fitness tip
// This will be called when someone clicks the new fitness tip button
// When a new tip is requested is will query the database respond with the tip in a json format. 
app.get('/new-fitness-tip', async (req, res) => {
    let newFitnessTipQuery = "SELECT statement FROM FitnessTips ORDER BY RAND() LIMIT 1";

    try {
        let fitnessTipRows = await executeQuery(newFitnessTipQuery);

        // Send the new fitness tip as JSON
        res.json({
            fitnessTip: fitnessTipRows[0]
        });

    } catch (error) {
        console.error(error);
    }
});


    

app.listen(PORT, function(){           
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});