const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const methodOverride = require('method-override')
const port = process.env.PORT || 4000;
const database = require("./config/database.js")
const system_config = require("./config/system.js")

//flash

//body
const bodyParser = require('body-parser')

//slug


app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }))

// parse application/json
app.use(bodyParser.json())
//routes
const route = require("./routes/client/index_routes.js")
const route_admin = require("./routes/admin/index_routes_admin.js")
route(app)
route_admin(app)

//connect database
database.connect();


//variable system 
app.locals.prefixAdmin = system_config.prefixAdmin;

// Pug
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

// Public folder
app.use(express.static(`${__dirname}/public`));

//listen port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});  
