
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

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

//check valid date

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false; // Date format is invalid
  }

  const date = new Date(dateString);

  return !isNaN(date) && date.toISOString().slice(0, 10) === dateString;
}


app.get("/api/:date", (req, res) => {
  const Urldate = req.params.date;
  console.log(typeof Urldate);
  if (Urldate === '') {
    alert("empty");
  }
  if (isValidDate(Urldate)) {
    const unixDate = new Date(Urldate).getTime();
    const utcDate = new Date(Urldate).toUTCString();
    res.send({ unix: unixDate, utc: utcDate });

  }
  if (typeof Urldate === 'number') {
    const dateInMilliseconds = Urldate * 1000;
    const newDate = new Date(dateInMilliseconds);
    res.send({ unix: Urldate, utc: newDate });
  }
  else {
    res.send({ error: "Invalid Date" })
  }
});



var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + "http://localhost:" + listener.address().port);
});