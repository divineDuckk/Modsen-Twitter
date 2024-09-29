describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.fixture('user').then(({ email, password }) => {
      cy.get('input[placeholder="Email address"]').type(email);
      cy.get('input[placeholder="Password"]').type(password);
    });
    cy.get('button').contains('Log In').click();
    cy.get('a[href="/home"]').click();
  });

  it('should display all required elements', () => {
    cy.wait(1000);

    cy.get('header').should('be.visible');
    cy.contains('Home').should('be.visible');
  });
  it('should render the ThemeButton and toggle theme', () => {
    cy.wait(1000);

    cy.get('input[type="checkbox"]').should('not.be.checked');

    cy.get('[data-testid="theme"]').click();
    cy.get('input[type="checkbox"]').should('be.checked');
    cy.get('[data-testid="theme"]').click();

    cy.get('input[type="checkbox"]').should('not.be.checked');
  });
  it('should allow a user to create a tweet, without img', () => {
    cy.wait(1000);

    const tweetText = 'This is a Cypress tweet';

    cy.get('textarea').type(tweetText);
    cy.get('[data-testid="createTweet"]').click();
    cy.wait(1000);
    cy.contains(tweetText).should('be.visible');
  });
  it('should allow a user to create a tweet, with img', () => {
    cy.wait(1000);

    const tweetText = 'This is a Cypress tweet';

    cy.get('textarea').type(tweetText);
    cy.fixture('user').then(({ backgroundUrl }) => {
      cy.get('input[type="file"]').attachFile(backgroundUrl);
    });
    cy.get('[data-testid="createTweet"]').click();
    cy.contains(tweetText).should('be.visible');
  });
  it('should add like if click', () => {
    cy.wait(1000);

    cy.get('[data-testid="likesSpan"]')
      .first()
      .invoke('text')
      .then((text) => {
        const initialSpanValue = parseInt(text);

        cy.get('img[alt="like"]').first().click();
        cy.get('img[alt="like"]')
          .first()
          .invoke('attr', 'src')
          .then((src) => {
            cy.get('[data-testid="likesSpan"]')
              .first()
              .invoke('text')
              .then((newValue) => {
                const newNumber = parseInt(newValue);
                if (src?.includes('redLike')) {
                  expect(newNumber).to.eq(initialSpanValue + 1);
                } else {
                  expect(newNumber).to.eq(initialSpanValue - 1);
                }
              });
          });
      });
  });
  it('should load more tweets when scrolling down', () => {
    cy.get('img[alt="like"]').then((tweets) => {
      const initialTweetCount = tweets.length;

      cy.scrollTo('bottom');

      cy.get('img[alt="like"]').should(
        'have.length.greaterThan',
        initialTweetCount,
      );
    });
  });
  it('should display a loader while tweets are being fetched', () => {
    cy.get('[data-testid="loader"]').should('be.visible');
    cy.get('[data-testid="loader"]').should('not.exist');
  });

  it('should redirect to profile when click link', () => {
    cy.get('[data-testid="profileLink"]').first().click();
    cy.url().should('include', '/profile');
  });
});
