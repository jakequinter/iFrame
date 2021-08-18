describe('FL-CCHDF iFrame', () => {
  it('Searching /iframe/FL-CCHDF', function () {
    cy.visit('/iframe/FL-CCHDF');

    cy.get('input').type('Jacksonville').wait(1000).type('{enter}');
    cy.contains(
      'There are currently no classes being offered near this location.'
    );
  });
});