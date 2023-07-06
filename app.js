const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { renderPage, convert } = require('./controllers/handler');

const app = express();    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', renderPage);

app.post('/', convert, renderPage);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});