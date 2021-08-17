describe('My First Test', () => {
  it('Navitating to /iframe/FL-CCHDF', function () {
    cy.visit('/iframe/FL-CCHDF');

    cy.url().should('include', '/iframe/FL-CCHDF');
    cy.contains('Search our network');
  });
});
