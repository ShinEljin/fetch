const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postroutes");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('public'));



app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb+srv://admin-raphael:Scnlhpr.062202@cluster0.flkrs.mongodb.net/fetchDB");

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));