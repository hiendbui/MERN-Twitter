const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require("express");
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const app = express();
const db = require('./config/keys').mongoURI;
const passport = require('passport');
require('./config/passport')(passport);
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


mongoose
  .connect(db, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
     })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use("/api/users", users);
app.use("/api/tweets", tweets);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
