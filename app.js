
//Set up express server
var express = require('express');   
var app     = express();            

//Set up handlebars for templating 
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');  
app.use(express.static('public'));

//Define a port number for the program to listen on
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



// Get the index page with nothing on it. This is what the user will see when they load up the application
app.get('/', (req, res) => {
    res.render('index');
});



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
//This will be called when onsome clicks the new fitness tip button
//When a new tip is requested is will query the database respond with the tip in a json format. 
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