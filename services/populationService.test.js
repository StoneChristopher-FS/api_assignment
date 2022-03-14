const {
    nationPop,
    nationPopByYear
} = require("./populationService.js")

jest.mock("./populationService.js")

describe("US Population Tests", () => {
    test("Should return 7 years of data", async () => {
        const result = await nationPop()

        expect(result).toHaveLength(7)
        expect(result[3].Nation).toEqual("United States")
        expect(result[3].Year).toEqual("2016")
        expect(result[3].Population).toEqual(323127515)
        
    })

    test("Should return US Population info by Year", async () => {
        const result = await nationPopByYear(2018)

        expect(result.Nation).toEqual("United States")
        expect(result.Year).toEqual("2018")
        expect(result.Population).toEqual(327167439)
    })
})