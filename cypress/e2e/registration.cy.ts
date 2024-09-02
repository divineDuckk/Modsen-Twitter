describe('registration page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/registration');
  });
  it('should display all required elements', () => {
    cy.get('img[alt="twiiter logo"]').should('be.visible');

    cy.contains('Create an account').should('be.visible');

    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Phone number"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
  });
  it('should show validation errors for required fields', () => {
    cy.get('button').contains('Next').click();
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('should show error for invalid email', () => {
    cy.get('input[placeholder="Email"]').type('@mail.com');
    cy.get('button').contains('Next').click();

    cy.url().should('not.include', '/profile');
  });

  it('should show error for short phone number', () => {
    cy.get('input[placeholder="Phone number"]').type('123');
    cy.get('button').contains('Next').click();
    cy.contains('Phone number must be at least 6 characters').should(
      'be.visible',
    );
  });

  it('should show error for short password', () => {
    cy.get('input[placeholder="Password"]').type('1234');
    cy.get('button').contains('Next').click();
    cy.contains('Password must be at least 6 characters').should('be.visible');
  });
  it('should change month', () => {
    cy.get('div').contains('Month').click();
    cy.get('div').contains('January').click();
    cy.contains('January').should('be.visible');
  });
  it('should change day', () => {
    cy.get('div').contains('Day').click();
    cy.get('div').contains('1').click();
    cy.contains('1').should('be.visible');
  });
  it('should change year', () => {
    cy.get('div').contains('Year').click();
    cy.get('div').contains('1924').click();
    cy.contains('1924').should('be.visible');
  });
});
