require('dotenv').config({path:__dirname + "/.env"})
const express = require("express")
const app = express()
const cors = require("cors")
const bodyPraser = require('body-parser')
const cookiesP = require('cookie-parser');
const path = require('path')
const port = process.env.PORT || 5000
const { mongodbConnection } = require("./connection/connection.js")
const postRouter = require("./routes/postroute.js")

// body parser
app.use(bodyPraser.json())
app.use(bodyPraser.urlencoded({ extended: true }))
app.use(cookiesP())
// app.use(express.static(path.join(__dirname, './views')))

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));

// connection
mongodbConnection(process.env.MONGOURL || "mongodb://localhost:27017/EcommerceStore")



app.use("/api", postRouter);


// set up static files
app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
)