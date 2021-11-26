var express = require("express");
var cors = require("cors");
var connectDB = require("./config/dbConnect.js");
var colors = require("colors");
var path = require("path");
require("dotenv").config();

//importing custom routes
var userRoutes = require("./routes/userRoutes.js");
var adminRoutes = require("./routes/adminRoutes.js")

//error handling imports
var { errorHandler, notFound } = require("./middleware/errorMiddleware.js");

const app = express();

// admin panel
app.use("/admin", adminRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//setup mongoose connection
connectDB();

//using custom routes
app.use("/api/user", userRoutes);

//handling deployment
const dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// error Handling middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
