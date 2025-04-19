import Quiz from "../../client/src/components/Quiz.tsx"


describe("Component testing for the Quiz component", () => {

    beforeEach(() => {
        cy.mount(<Quiz/>)
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
    })
// TODO:  finish 2nd question
// TODO: finish end page
})