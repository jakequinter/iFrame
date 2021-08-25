describe('Navigation', () => {
  it('Curriculum', function () {
    cy.visit('/iframe/curriculum/FL-CCHDF');
    cy.location('pathname').should('eq', '/iframe/curriculum/FL-CCHDF');

    cy.contains('Search our network');
  });

  it('Organization', function () {
    cy.visit('/iframe/organization/2');
    cy.location('pathname').should('eq', '/iframe/organization/2');

    cy.contains('Search our network');
  });

  it('Instructor', function () {
    cy.visit('/iframe/instructor/2');
    cy.location('pathname').should('eq', '/iframe/instructor/2');

    cy.contains('Search our network');
  });

  // paths must be curriculum, organization, or instructor
  it('Invalid path', function () {
    cy.visit('/iframe/test/FL-CCHDF');

    cy.contains('404');
  });
});