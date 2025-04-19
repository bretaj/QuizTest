// TODO: why red squiggle? issue with tsconfig.json files?

import Quiz from "../../client/src/components/Quiz.tsx"

describe("Component testing for the Quiz component", () => {

    beforeEach(() => {
        cy.mount(<Quiz />)
        cy.intercept({
            method: "GET",
            url: "/api/questions/random"
        }, {
            fixture: "questions.json",
            statusCode: 200
        })

    })


    it("should show a start button at the beginning", () => {
        cy.get("button").should("contain.text", "Start Quiz")
    })


    it("should display the first question after clicking the Start Quiz button", () => {
        cy.get("button").click()
        cy.get("h2").should("contain.text", "Which of the following is a valid variable name in Python?")
        cy.get("div.alert").eq(0).should("contain.text", "1_variable")
        cy.get("div.alert").eq(1).should("contain.text", "variable_1")
        cy.get("div.alert").eq(2).should("contain.text", "variable-1")
        cy.get("div.alert").eq(3).should("contain.text", "variable 1")
        // put correct answer as index for .click() --check server/src/seeds/pythonQuestions
        cy.get("button").eq(1).click()

    })
    // TODO:  finish 2nd question & make .onclick() with correct answer in index
    it("should display the final question after clicking one of the choices", () => {
        cy.get("button").click()
        // cy.get("h2").should("contain.text", "Which of the following is a valid variable name in Python?")
        // cy.get("div.alert").eq(0).should("contain.text", "1_variable")
        // cy.get("div.alert").eq(1).should("contain.text", "variable_1")
        // cy.get("div.alert").eq(2).should("contain.text", "variable-1")
        // cy.get("div.alert").eq(3).should("contain.text", "variable 1")
        // TODO: use beforeEach or a function?? to clean up this code???
        cy.get("button").eq(1).click()
        // cy.get("button").click()
        cy.get("h2").should("contain.text", "What is the output of type(3.14)?")
        cy.get("div.alert").eq(0).should("contain.text", "<class 'int'>")
        cy.get("div.alert").eq(1).should("contain.text", "<class 'float'>")
        cy.get("div.alert").eq(2).should("contain.text", "<class 'complex'>")
        cy.get("div.alert").eq(3).should("contain.text", "<class 'decimal'>")
        // put correct answer as index for .click() --check server/src/seeds/pythonQuestions
        cy.get("button").eq(1).click()

    })
    // TODO: finish end page
    // it("should show your score, and a button that lets you restart the quiz", () => {
    //     cy.get("button").should("contain.text", "Start Quiz")
    // })
})