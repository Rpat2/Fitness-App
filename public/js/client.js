
//This is my front end javascript that involves DOM maniputation. 


//This is an event listener placed on the new quote button. 
document.getElementById('newQuoteButton').addEventListener('click', async () => {
    
    try {
        // Fetch is used to make an HTTP request to the app.js. Fetch returns a promise, Await makes an async function wait for a promise before continuing
        //The app.js has a path that handles this endpoint.
        const response = await fetch('/new-quote');

        //If the response is not ok then a error will be thrown 
        if (!response.ok) {
            throw new Error('Could not get the resouce');
        }

        //If the response was ok then we create a data constant that converrts the response to JSON. 
        const data = await response.json();

        //This manipulates the innter HTML of the display quote table to show the new quote
        document.getElementById('quoteDisplay').innerHTML = `"${data.quote.statement}" - ${data.quote.author}`;


        // Hide the fitness tip table and show the quote table when the quote is displayed 
        document.getElementById('fitnessTipTable').style.display = 'none';
        document.getElementById('quoteTable').style.display = 'table';
        document.getElementById('learnTable').style.display = 'none';


    //If a promise returns an error then catch that error
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});


//This is an event listener that is placed on the new fitness tip button. 
//fetch is used to make an HTTP request to the app.js 

document.getElementById('newFitnessTipButton').addEventListener('click', async () => {
    try {
        // This is used make a HTTP request to the new fitness tip the app.js. The app.js has a path that handles this endpoint. 
        const response = await fetch('/new-fitness-tip');

        //If the reponse is not ok then throw an error 
        if (!response.ok) {
            throw new Error("Could not fetch that resource");
        }

        //If the response was ok then we create a data constant that converts the response to JSON. 
        const data = await response.json();

        // Update the displayed fitness tip
        document.getElementById('fitnessTipDisplay').innerHTML = data.fitnessTip.statement;

        // Hide the quote table and show the fitness tip table
        document.getElementById('quoteTable').style.display = 'none';
        document.getElementById('fitnessTipTable').style.display = 'table';
        document.getElementById('learnTable').style.display = 'none';

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});


//This is an event listener placed on the reset form button 
document.getElementById('resetFom').addEventListener('click', ()=>{

    //This reloads the page if the user clicks the reset button
    if (confirm("Are you sure you want to reset? Your current quote or fitness tip will disappear")) {
        location.reload();
        
      } else {
        console.log("User clicked cancel");
      }

});


//When the more information table is displayed then you hide the other tables 
document.getElementById('learnMore').addEventListener('click', ()=>{
    document.getElementById('learnTable').style.display = 'table';
    document.getElementById('fitnessTipTable').style.display = 'none';
    document.getElementById('quoteTable').style.display = 'none';

});


