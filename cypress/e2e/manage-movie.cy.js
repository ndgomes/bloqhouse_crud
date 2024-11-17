describe('Add movie', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // Test for adding a movie
  it('should add a movie', () => {
    cy.get('[data-testid="add-movie"]').contains('Add Movie').click();
    cy.get('input[name="title"]').type('The Matrix');
    cy.get('textarea[name="description"]').type(
      'A movie about a man who fights crime.'
    );
    cy.get('input[name="genre"][value="Action"]').check();
    cy.get('input[name="rating"]').type('8');
    cy.get('input[name="releaseYear"]').type('1999');
    cy.get('input[name="coverImage"]').type(
      'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'
    );
    cy.get('[data-testid="submit-movie"]').click();

    cy.wait(3000);

    cy.get('h3[class="title"]').contains('The Matrix').should('exist');
  });

  // Test for editing a movie
  it('should edit a movie', () => {
    cy.get('h3[class="title"]').contains('The Matrix').click();
    cy.get('[data-testid="edit-movie"]').click();
    cy.get('input[name="releaseYear"]').clear().type('2000');
    cy.get('[data-testid="confirm-edit-movie"]')
      .contains('Save Changes')
      .click();

    cy.wait(3000);

    cy.get('p').contains('Release Year: 2000').should('exist');
  });

  // Test for deleting a movie
  it('should delete a movie', () => {
    cy.get('h3[class="title"]').contains('The Matrix').click();
    cy.get('[data-testid="delete-movie"]').click();
    cy.get('[data-testid="confirm-delete-movie"]').contains('Yes').click();

    cy.wait(3000);

    cy.get('h3[class="title"]').contains('The Matrix').should('not.exist');
  });
});
