console.log("server is running...");


// Required npm modules and other variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const Slave = require("./models/slave");
const port = process.env.PORT || 3030;


// Required database
require("./db/db");

// Setting up session
app.use(session({
	secret: "insert_subject_string_here",
	resave: false,
	saveUninitialized: false
}));

// Required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));


// Required controllers for router
// Tournaments controller
const tournamentController = require("./controllers/tourney");
app.use("/tourneys", tournamentController);

// User controller
const userController = require("./controllers/user");
app.use("/users", userController);

// Slaves controller
const slaveController = require("./controllers/slave");
app.use("/slaves", slaveController);

// Auth controller
const authController = require("./controllers/auth");
app.use("/auth", authController);
app.use((req, res, next) => {
	if (req.session.loggedIn === true) {
		return next();
	} else {
		res.redirect("/auth");		
	}
});


// This allows the user to remain logged in after restarting the server.
const store = new MongoDBStore({
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/grocery_app_dev",
mongoose.connect(mongoUri);
  collection: 'mySessions'
});
 
store.on('connected', function() {
  store.client; // The underlying MongoClient object from the MongoDB driver
});
 
// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});
 
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));


// Home Route
app.get("/", async (req, res) => {
    try {
      // await clearDb;
      console.log(req.session.userId)
      res.render("index.ejs", {
      "displayName": req.session.displayName,
      "userId": req.session.userId
    })
    } catch (err) {
      res.send(err)
    }
});


// Listening for server
app.listen(3030, () => {
	console.log("server.js is listening on port 3030.");
});

app.listen(port);
console.log(`Server is running on port ${port}`);