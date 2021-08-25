describe('Curriculum FL-CCHDF', () => {
  beforeEach(() => {
    cy.visit('/iframe/curriculum/FL-CCHDF');
  });

  it('Invalid search', function () {
    cy.get('input').type('Boston').wait(1000).type('{enter}');
    cy.contains(
      'There are currently no classes being offered within 100 miles of this location.'
    );
  });

  it('Verify curriculum occurrences', function () {
    cy.get('.Occurrences_container__8vr7- > a')
      .should('have.attr', 'href')
      .and('include', Cypress.env('NEXT_PUBLIC_TRAINING_URL'));
  });
});
