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

  it('should display all required elements', () => {
    cy.get('img[alt="background"]').should('be.visible');
    cy.get('img[alt="avatar"]').should('be.visible');
  });
  it('should open&close popup profile', () => {
    cy.contains('Edit profile').click();
    cy.get('[data-testid="popupWrap"]').should('be.visible');
    cy.get('[data-testid="popupWrap"]').click(1150, 50);
    cy.contains('Tweets').should('be.visible');
  });
  it('should edit profile', () => {
    const aboutMe = 'nothing';
    const phone = '+37533647800';

    cy.contains('Edit profile').click();
    cy.get('[data-testid="popupWrap"]').should('be.visible');
    cy.get('input[placeholder="About me"]').clear().type(aboutMe);

    cy.get('input[placeholder="Phone number"]').clear().type(phone);
    cy.contains('Save').click();
    cy.contains(aboutMe).should('be.visible');
  });
  it('should delete tweet', () => {
    const tweetText = 'This is a Cypress profile tweet';

    cy.get('textarea').type(tweetText);
    cy.get('[data-testid="createTweet"]').click();
    cy.wait(1000);
    cy.contains(tweetText).should('be.visible');

    cy.get('img[alt="settings"]').first().click();
    cy.get('[data-testid="deleteTweet"]').first().click();
    cy.wait(1000);
    cy.contains(tweetText).should('not.exist');
  });
  it('should follow&unfollow on user', () => {
    cy.get('a[href="/home"]').click();

    cy.get('[data-testid="profileLink"]').last().click();
    cy.url().should('include', '/profile');

    cy.get('[data-testid="follow"]')
      .invoke('text')
      .then((text) => {
        const isFollow = text === 'Follow';
        cy.get('[data-testid="follow"]').click();
        if (isFollow) {
          cy.contains('Unfollow').should('be.visible');
        } else {
          cy.contains('Follow').should('be.visible');
        }
      });
  });
});
