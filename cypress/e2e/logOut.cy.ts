describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.fixture('user').then(({ email, password }) => {
      cy.get('input[placeholder="Email address"]').type(email);
      cy.get('input[placeholder="Password"]').type(password);
    });
    cy.get('button').contains('Log In').click();
    cy.wait(1000);
  });

  it('should logout', () => {
    cy.contains('Log out').click();
    cy.url().should('include', 'signup');
  });
});
