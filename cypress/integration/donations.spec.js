/// <reference types="cypress" />

describe("Donations", () => {

    it("Testing Germany address ", () => {
        cy.createDonation("25", "Peter", "Payer", "peter.payer@gmail.com", "Unbekannt 1", "Uffing am Staffelsee", "Germany{enter}", "82449")
        cy.cardPayment("4242424242424242", "424", "242")
    });

    // it("Testing with Support Link ", () => {
    //     supportGift("yucatan", "25", "Peter", "Payer", "peter.payer@gmail.com", "Unbekannt 1", "Uffing am Staffelsee", "Germany{enter}", "82449")
    //     cardPayment("4242424242424242", "424", "242")
    // });

    it("Testing with Gift Donation ", () => {
        cy.giftDonation("25", "Peter", "Payer", "peter.payer@gmail.com", "Unbekannt 1", "Uffing am Staffelsee", "Germany{enter}", "82449")
        cy.cardPayment("4242424242424242", "424", "242")
    });;

    // International Cards
    it("Testing with Germany Visa", () => {
        cy.createDonation("25", "Peter", "Payer", "peter.payer@gmail.com", "Unbekannt 1", "Uffing am Staffelsee", "Germany{enter}", "82449")
        cy.cardPayment("4000002760000016", "424", "242")
    });

    it("Testing with Spain Visa", () => {
        cy.createDonation("25", "Peter", "Payer", "peter.payer@gmail.com", "aunchd", "Montcada i Reixac", "Spain{enter}", "08110")
        cy.cardPayment("4000007240000007", "424", "242")
    });

    //error testing
    it("Testing with Charge declined error", () => {
        cy.createDonation("25", "Peter", "Payer", "peter.payer@gmail.com", "aunchd", "Montcada i Reixac", "Spain{enter}", "08110")
        cy.paymentError("4000000000000002", "424", "242")
    });
    it("Testing with Insufficient funds error", () => {
        cy.createDonation("25", "Peter", "Payer", "peter.payer@gmail.com", "aunchd", "Montcada i Reixac", "Spain{enter}", "08110")
        cy.paymentError("4000000000009995", "424", "242")
    });
    

})