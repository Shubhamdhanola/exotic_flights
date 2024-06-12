const express = require('express')
const userRouter = require('./routes/users-routes')
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')
const mongoose = require("mongoose")
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use("/api/users", userRouter)

app.use((req, res, next) => {
    throw new HttpError("Could not find this route", 404)
})

app.use((error, req, res, next) => {
    if(req.headerSent) {
        next(error)
    }
    res.status(error.code || 404)
    res.json({message: error.message || 'An Unkown Error Occurred!'})
})

mongoose.connect(``)
.then(()=>{
    console.log("Connecte to DB!")
    app.listen(8080);
})
.catch(err => console.log(err))
