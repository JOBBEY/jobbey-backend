const os = require('os')
const express = require('express')
const app = express()
const cors = require('cors')

const {config} = require('./config/index')
const usersAPI = require('./routes/users.js')
const jobsAPI = require('./routes/jobs.js')



// body parser
app.use(cors())
app.use(express.json());
usersAPI(app);
jobsAPI(app);

app.listen(config.port, function () {
    console.log('Listening from:', config.port);        
})