describe('Organization', () => {
  beforeEach(() => {
    cy.visit('/iframe/organization/44425820-bff4-11eb-8b85-02420a000128');
  });

  it('Verify organization occurrences', function () {
    cy.get('.Occurrences_container__8vr7- > a')
      .should('have.attr', 'href')
      .and('include', Cypress.env('NEXT_PUBLIC_TRAINING_URL'));
  });
});
