// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.get("/api/:date", function(req, res) {
    const userInput = req.params.date;
    console.log(typeof userInput)

    function evaluateValue(userValue) {
        let evaluatedValue;
        //const timeObject = { unix: null, utc: null }
        const timeObject = {}
        console.log(userValue)
        console.log(Number.isInteger(userValue))

        function isInDesiredForm(str) {
            return /^\+?(0|[1-9]\d*)$/.test(str);
        }

        Object.assign(timeObject,
                //milliseconds
                isInDesiredForm(userValue) && { unix: userValue },
                isInDesiredForm(userValue) && {
                    utc: new Date(parseInt(userValue)).toUTCString(),
                }, !isInDesiredForm(userValue) && { unix: Date.parse(userValue) }, !isInDesiredForm(userValue) ? { utc: new Date(userValue).toUTCString() } : { error: "Invalid Date" }

                //datestring:  
                /*Date.parse(userValue) != NaN && {
                    unix: Date.parse(userValue),
                    utc: new Date(userValue).toUTCString()
                },
                Date.parse(userValue) == NaN && Number.isInteger == false && {
                    error: "Invalid Date"
                }*/
            )
            /*if (Number.isInteger(userValue)) {
                evaluatedValue =
                    timeObject.unix = userValue
                timeObject.utc = evaluatedValue
                console.log(res)
            } else if (Date.parse(userValue) != NaN) {
                evaluatedValue = Date.parse(userValue)
                timeObject.unix = evaluatedValue
                timeObject.utc = userValue
                console.log(res)
            } else res = { error: "Invalid Date" }*/
        console.log(timeObject)
            //else return res = { error: "Invalid Date" }
    }

    evaluateValue(userInput)


    //console.log(userValue)
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + process.env.PORT);
});