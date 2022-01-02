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

app.get("/api/", function(req, res) {
    const nowSinceEpoch = Date.now()
    const today = new Date(nowSinceEpoch)
    const utcToday = today.toUTCString()
    res.send({ unix: nowSinceEpoch, utc: utcToday })
})

app.get("/api/:date?", function(req, res) {
    const userInput = req.params.date;
    //console.log(typeof userInput)
    const timeObject = {}

    function evaluateValue(userValue) {
        let evaluatedValue;
        //const timeObject = { unix: null, utc: null }

        //console.log(userValue)
        //console.log(Number.isInteger(userValue))

        function isInDesiredForm(str) {
            return /^\+?(0|[1-9]\d*)$/.test(str);
        }

        Object.assign(timeObject,
            //milliseconds
            isInDesiredForm(userValue) && { unix: userValue },
            isInDesiredForm(userValue) && {
                utc: new Date(parseInt(userValue)).toUTCString(),
            }, !isInDesiredForm(userValue) && { unix: Date.parse(userValue) }, !isInDesiredForm(userValue) && { utc: new Date(userValue).toUTCString() })

        if (isNaN(timeObject.unix)) {
            delete timeObject.unix
            delete timeObject.utc
            Object.assign(timeObject, { error : "Invalid Date" })
        }

        //console.log(timeObject)
        //return timeObject
    }

    evaluateValue(userInput)
    res.send({ unix: timeObject.unix, utc: timeObject.utc })

    //console.log(userValue)
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + process.env.PORT);
});