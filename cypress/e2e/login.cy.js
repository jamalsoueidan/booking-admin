/// <reference types="cypress" />

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://127.0.0.1:5173/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.Polaris-Button__Text').click();
    cy.get('.Polaris-HorizontalStack > .Polaris-Link').click();
    cy.get('.Polaris-Button__Text').click();
    cy.get('.Polaris-Button').click();
    cy.get(':nth-child(1) > :nth-child(5) > .Polaris-Navigation__ItemWrapper > .Polaris-Navigation__ItemInnerWrapper > .Polaris-Navigation__Item > .Polaris-Navigation__Text').click();
    cy.get('.Polaris-Text--bodyMd > div').click();
    cy.get(':nth-child(5) > .fc-day-fri > .fc-daygrid-day-frame > .fc-daygrid-day-events').click();
    cy.get('#start').clear('01:00');
    cy.get('#start').type('12:00');
    cy.get('#end').click();
    cy.get(':nth-child(3) > div > .Polaris-Icon > .Polaris-Icon__Svg').click();
    cy.get('#Weekend').click();
    cy.get('.Polaris-Box > .Polaris-HorizontalStack > .Polaris-Button').click();
    cy.get('.fc-day-fri > .fc-daygrid-day-frame > .fc-daygrid-day-events > .fc-daygrid-event-harness > .fc-event > .fc-event-main > div > .Polaris-Text--bodyMd').click();
    cy.get('.Polaris-Modal-CloseButton > .Polaris-Icon > .Polaris-Icon__Svg').click();
    cy.get('.fc-day-fri > .fc-daygrid-day-frame > .fc-daygrid-day-events > .fc-daygrid-event-harness > .fc-event').should('have.text', 'Weekend12:00 - 16:00');
    cy.get('.fc-day-fri > .fc-daygrid-day-frame > .fc-daygrid-day-events > .fc-daygrid-event-harness > .fc-event').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
});
