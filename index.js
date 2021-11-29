const { MongoClient } = require("mongodb");
const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.btktr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

let db;

client.connect().then((xclient) => {
  db = xclient.db();

  db.collection("contactDetails")
    .find({}, { projection: { _id: 0 } })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
    });
});

app.get("/", function (req, res) {
  db.collection("contactDetails")
    .find({}, { projection: { _id: 0 } })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});

client.connect().then(function (xclient) {
  db = xclient.db();
  app.listen(3000, function () {
    console.log("Server started at port 7000");
    console.log("\nYour contact details: ");
  });
});
