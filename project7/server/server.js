const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const userRouts = require('./routes/userRouter');
// const recipesRouts = require('./routes/recipesRouter');
const notFoundHandler = require('./middleware/404');
const dbURI = "mongodb+srv://majdishomali1997:uVxsL6cXyv6CIZv8@cluster0.pacgw6a.mongodb.net/test"
const errorHandler = require('./middleware/500')
const Protected = require('./middleware/Protected')
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(userRouts);
// app.use(recipesRouts);
app.use('*',notFoundHandler);
app.use(errorHandler);
app.use(Protected)







module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};