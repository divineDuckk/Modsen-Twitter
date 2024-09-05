describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.fixture('user').then(({ email, password }) => {
      cy.get('input[placeholder="Email address"]').type(email);
      cy.get('input[placeholder="Password"]').type(password);
    });
    cy.get('button').contains('Log In').click();
    cy.wait(1500);
  });

  it('should search tweet in sidebar', () => {
    const query = 'he';
    const responseText = 'Hello';

    cy.get('input[placeholder="Search Twitter"]').clear().type(query);
    cy.contains(responseText).should('be.visible');
  });

  it('should search user in explore', () => {
    cy.visit('http://localhost:5173/explore');

    const query = 'div';
    const responseText = 'Divine duck';

    cy.get('input[placeholder="Search User"]').first().type(query);
    cy.contains(responseText).should('be.visible');
  });
  it('should search user in home', () => {
    cy.visit('http://localhost:5173/home');

    const query = 'div';
    const responseText = 'Divine duck';

    cy.get('input[placeholder="Search User"]').clear().type(query);
    cy.contains(responseText).should('be.visible');
  });
});
