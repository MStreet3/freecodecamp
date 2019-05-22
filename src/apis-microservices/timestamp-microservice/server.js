// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// timestamp microservice
const processTimestamp = (req, res) => {
  let payload = req.params.date_string;
  if (!payload) {
    let date = new Date();
    return res.json({
      statusCode: 200,
      body: {
        unix: date.getTime(),
        utc: date.toUTCString()
      }
    });
  } else {
    let date = new Date(payload);
    let utc = date.toUTCString();
    let unix = date.getTime();
    if (!unix || utc === 'Invalid Date') {
      return res.json({
        statusCode: 200,
        body: {
          error: 'Invalid Date'
        }
      });
    } else {
      return res.json({
        statusCode: 200,
        body: {
          unix: unix,
          utc: utc
        }
      });
    }
  }
};
app.get('/api/timestamp/:date_string?', processTimestamp);

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
