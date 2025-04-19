function interceptAndStart() {
    cy.intercept({
        method: "GET",
        url: "http://127.0.0.1:3000/api/questions/random"
    }, {
        fixture: "questions.json",
        statusCode: 200
    })

    cy.get("button").click()
}

describe("E2E test for the Quiz App", () => {
    beforeEach(() => {
         cy.visit("http://127.0.0.1:3000/")
    })


    it("should show a start button at the beginning", () => {
        cy.get("button").should("contain.text", "Start Quiz")
    })


    it("should display the first question after clicking the Start Quiz button", () => {
        interceptAndStart()
        cy.get("h2").should("contain.text", "Which of the following is a valid variable name in Python?")
    })


    it("should display the next question after clicking one of the choices", () => {
        interceptAndStart()
        // cy.get("h2").should("contain.text", "Which of the following is a valid variable name in Python?")
        cy.get("button").eq(0).click()
        cy.get("h2").should("contain.text", "What is the output of type(3.14)?")

    })

    it("should display the end of the quiz", () => {
        interceptAndStart()
        // cy.get("h2").should("contain.text", "Which of the following is a valid variable name in Python?")
        cy.get("button").eq(0).click()
        cy.get("h2").should("contain.text", "What is the output of type(3.14)?")
        cy.get("button").eq(3).click()
        cy.get("h2").should("contain.text", "Quiz Completed")

    })
    it("should restart the quiz when Take New Quiz button is clicked ", () => {
        interceptAndStart()
        // cy.get("h2").should("contain.text", "Which of the following is a valid variable name in Python?")
        cy.get("button").eq(0).click()
        // cy.get("h2").should("contain.text", "What is the output of type(3.14)?")
        cy.get("button").eq(3).click()
        // cy.get("h2").should("contain.text", "Quiz Completed")
        cy.get("button").click()
        cy.get("h2").should("contain.text", "Which of the following is a valid variable name in Python?")

    })
})