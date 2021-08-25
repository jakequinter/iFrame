describe('Instructor', () => {
  beforeEach(() => {
    cy.visit('/iframe/instructor/f5dd8642-c2b0-11e9-b129-0242c0a80003');
  });

  it('Verify instructor occurrences', function () {
    cy.get('.Occurrences_container__8vr7- > a')
      .should('have.attr', 'href')
      .and('include', Cypress.env('NEXT_PUBLIC_TRAINING_URL'));
  });
});
