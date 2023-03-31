/** @format */

const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Auth");
//app config
const app = express();
const port = 7000;
dotenv.config();
app.use(express.json());

app.use(Cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
const MONGO_URI =
  "mongodb+srv://anoojam:AChNgkmmNI36lmCO@cluster0.smydh2g.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected  to mongodb !!"))

  .catch((err) => console.log(err.message));
  app.get("/", async (req, res) => {
   
    res.send("API is running");
  });
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`listening in : ${port}`);
});
