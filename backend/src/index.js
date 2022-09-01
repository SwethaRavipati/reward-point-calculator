const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*'
}));

const username = "<<MongoDB username>>";
const password = "<<MongoDB password>>";
const cluster = "<<MongoDB cluster>>";
const dbname = "<<MongoDB database name>>";


mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// ...
app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
