const axios = require("axios")

const nationPop = () => {
    console.log("Real US Population")
    return axios.get(`${process.env.popURL}`)
    .then(result => {
        return result.data
    })
}

const nationPopByYear = (year) => {
    console.log("Real US Population By Year")
    return axios.get(`${process.env.popURL}&year=${year}`)
    .then(result => {
        return result.data
    })
}

module.exports = {
    nationPop,
    nationPopByYear
}