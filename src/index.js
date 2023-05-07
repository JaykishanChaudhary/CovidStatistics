const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const CovidRouter=require('./router');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')
// const refreshAll=require('./createDatabase');
app.use('/',CovidRouter);





app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;