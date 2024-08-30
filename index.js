const express = require("express");
const mongoose = require("mongoose");
const cookieParser= require("cookie-parser");

const app = express();
const userRouter= require("./routes/userRoutes")


const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amananurag20:YlnMdLa8jS8FTqJw@cluster0.oib3vus.mongodb.net/authentication"
    );
    console.log("mongodb Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())



app.use("/user",userRouter);

app.listen(5000, () => {
  console.log("Server is listinig on port no 5000");
});
