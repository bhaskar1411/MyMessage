const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongoose');

const postsRoutes = require("./routes/posts");

const userRoutes = require("./routes/user");

const app = express();

mongoClient.connect("mongodb+srv://bhaskar:" + process.env.MONGO_ATLAS_PW + "@cluster0-wvphs.mongodb.net/mean?retryWrites=true")
.then(() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Connection failed');
});

// mongoClient.connect('mongodb://127.0.0.1:27017/mean-course')
// .then(() => {
//   console.log('Connected to database');
// })
// .catch(() => {
//   console.log('Connection failed')
// });

//CD8APsHK3BGR3fA3

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname,"angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// RO02mtoMosBnYJq7

app.use("/api/posts", postsRoutes);

app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});


module.exports = app;
