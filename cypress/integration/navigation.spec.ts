describe('FL-CCHDF iFrame', () => {
  it('Navitating to /iframe/FL-CCHDF', function () {
    cy.visit('/iframe/FL-CCHDF');
    cy.location('pathname').should('eq', '/iframe/FL-CCHDF');

    cy.contains('Search our network');
  });
});