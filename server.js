//bring in express
const express = require('express');

//initialize Express into a variable called app
const app = express();
const path = require('path');

//bring in local json files
const villagerData = require('./db/villagers.json');
const itemsData = require('./db/items.json');
const recipesData = require('./db/recipes.json');

//Without headers fetching of local json data doesn't work (says no access for access-control-allow-origin)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//allows to fetch json data from local json files when /api/... hit
app.get('/api/villagers', function (req, res) {
  res.send(villagerData);
});
app.get('/api/items', function (req, res) {
  res.send(itemsData);
});
app.get('/api/recipes', function (req, res) {
  res.send(recipesData);
});

//Serve static assets in production (serve React)
//Set static folder
app.use(express.static('client/build'));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

//sets PORT to process.env.PORT - it looks for variable
//called PORT first and then to any port we want (5000 in this case)
const PORT = process.env.PORT || 5000;

//listen method - takes in a port to listen (5000) and also accepts
//callback if we want something else to happen
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
