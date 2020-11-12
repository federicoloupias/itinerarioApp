const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const register = require("./routes/register");
const activities = require("./routes/activities");
const cities = require("./routes/cities");
const itineraries = require("./routes/itineraries");
const login = require("./routes/login");
const googleLogin = require("./auth/authAPI");
const likes = require("./routes/likes");
const comments = require("./routes/comments");
app.use(express.json())

mongoose.connect("mongodb+srv://LucasCampos:La25stone@mytinerarycluster-fdoet.mongodb.net/mytinerary?retryWrites=true&w=majority",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})


router.get("/", (req, res) => {
  res.send("Main page")
});


app.use('/', router);
app.use('/', cities);
app.use('/', itineraries);
app.use('/', activities);
app.use('/', comments);
app.use('/users', register);
app.use('/users', login);
app.use('/users', likes);
app.use('/', googleLogin);


app.listen(port, () => console.log('Server running on port '+ port));