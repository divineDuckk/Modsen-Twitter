describe('login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display all required elements', () => {
    cy.get('img[alt="twitter logo"]').should('be.visible');
    cy.contains('Log in to Twitter').should('be.visible');
    cy.get('input[placeholder="Email address"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Log In').should('be.visible');
    cy.contains('Sign up to Twitter').should('be.visible');
  });

  it('should log in successfully and redirect to profile', () => {
    cy.fixture('user').then(({ email, password }) => {
      cy.get('input[placeholder="Email address"]').type(email);
      cy.get('input[placeholder="Password"]').type(password);
    });

    cy.get('button').contains('Log In').click();

    cy.url().should('include', '/profile');
  });
});
