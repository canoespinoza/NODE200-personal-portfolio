const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
//const axios = require("axios");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(8080, () => {
  console.log("listening at http://localhost:8080");
});

app.get('/', (req, res) => {
  res.render('./index.ejs');
})

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body })
  console.log(req.body)
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body })
  const { firstName, lastName, email } = req.body;

  //sends form data to Google Sheets
  let formData =
    'firstName=' + encodeURIComponent(firstName) +
    '&lastName=' + encodeURIComponent(lastName) +
    '&email=' + encodeURIComponent(email)

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzuwcNjdYGDVXs6KwULfcDBABunMnQw8qGYIVaYGuFX29FEdJPw/exec';
  
axios({
  method: 'post',
  url: scriptURL,
  data: formData
})
.catch(error => console.error('Error!', error.message));

//thanks the contact by name
const contact = { firstName, lastName };
console.log(contact);

res.render('thanks', { contact });
});


// Catch and handle everything else
app.get('*', function (req, res) {
  res.send('Whoops, page not found 404').status(404);
})

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body })
  const { firstName, lastName, email } = req.body;

  //sends form data to Google Sheets
  let formData =
    'firstName=' + encodeURIComponent(firstName) +
    '&lastName=' + encodeURIComponent(lastName) +
    '&email=' + encodeURIComponent(email)

  const scriptURL = process.env.SCRIPT_URL.toString();
});

