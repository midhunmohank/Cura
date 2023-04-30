const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cors = require('cors');
const config_passport = require('./config/passport');
const bodyParser = require('body-parser');

const fileupload = require("express-fileupload");


require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true  }));
app.use(fileupload());
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
   console.log("MongoDB database connection established successfully.");
});

app.use(cors());

app.use(passport.initialize());

app.use(require('../nodejsBackend/routes/route'))


app.listen(port, () => {
   console.log('Server is running on port: '+port);
});


// module.exports = app;
