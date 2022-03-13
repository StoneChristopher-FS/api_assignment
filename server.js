const express = require("express")
const res = require("express/lib/response")
const app = express()
require("dotenv").config()

const {
    nationPop,
    nationPopByYear
} = require("./services/populationService")

// for localhost:3000/
app.get("/", (req, res, next) => {
    res.status(200).send("Service is up!\nUse /population to get US population data.\nUse /population/'year' to select a specific year.\nUse /population/latest to get the most recent year.")
})

// get service
// http://localhost:3000/population
app.get("/population", (req, res, next) => {
    nationPop()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status || 501).json({
        error: {
            message: err.message,
            status: err.status,
            method: req.method
        }
    }))
})

// get service by year
// http://localhost:3000/population/year
app.get("/population/:year", (req, res, next) => {
    const popYear = req.params.year
    nationPopByYear(popYear)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status || 501).json({
        error: {
            message: err.message,
            status: err.status,
            method: req.method
        }
    }))
})

// middleware modules for error handling
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!!!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message, 
            status: error.status,
            method: req.method
        }
    });
})

app.listen(process.env.port, () => {
    console.log(`Server starting on port ${process.env.port}`)
})