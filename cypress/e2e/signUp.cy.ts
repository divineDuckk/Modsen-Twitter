describe('signUp page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display all required elements', () => {
    cy.get('h1').should('contain', 'Happening now');
    cy.get('h2').should('contain', 'Join Twitter today');
    cy.get('button').contains('Sign up with Google').should('be.visible');
    cy.get('button').contains('Sign up with email').should('be.visible');
    cy.get('span').should('contain', 'Already have an account? Log in');
  });

  it('should navigate to registration with email', () => {
    cy.get('button').contains('Sign up with email').click();

    cy.url().should('include', '/registration');
  });

  it('should navigate to login page', () => {
    cy.get('a').contains('Log in').click();

    cy.url().should('include', '/login');
  });
});
