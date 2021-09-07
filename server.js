const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

console.log(19);
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
console.log(27);
// DB Config
const db = require("./config/keys").mongoURI;
console.log(30);
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
console.log(39);
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/users", users);
console.log(48);
const port = process.env.PORT || 8080; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
