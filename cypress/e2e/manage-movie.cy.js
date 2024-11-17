Cypress.Commands.add(
  'addMovie',
  (title, description, genre, rating, releaseYear, coverImage) => {
    cy.get('[data-testid="add-movie"]').click();
    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="description"]').type(description);
    cy.get(`input[name="genre"][value="${genre}"]`).check();
    cy.get('input[name="rating"]').type(rating);
    cy.get('input[name="releaseYear"]').type(releaseYear);
    cy.get('input[name="coverImage"]').type(coverImage);
    cy.get('[data-testid="submit-movie"]').click();
  }
);

Cypress.Commands.add('editMovie', (title, newReleaseYear) => {
  cy.get('h3[class="title"]').contains(title).click();
  cy.get('[data-testid="edit-movie"]').click();
  cy.get('input[name="releaseYear"]').clear().type(newReleaseYear);
  cy.get('[data-testid="confirm-edit-movie"]').contains('Save Changes').click();
});

Cypress.Commands.add('deleteMovie', (title) => {
  cy.get('h3[class="title"]').contains(title).click();
  cy.get('[data-testid="delete-movie"]').click();
  cy.get('[data-testid="confirm-delete-movie"]').contains('Yes').click();
});

describe('Add/Edit/Delete Movie', () => {
  const uniqueTitle = `The Matrix ${Date.now()}`;

  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a movie', () => {
    cy.addMovie(
      uniqueTitle,
      'A movie about a man who fights crime.',
      'Action',
      '8',
      '1999',
      'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'
    );

    cy.get('h3[class="title"]').contains(uniqueTitle).should('exist');
  });

  it('should edit a movie', () => {
    cy.editMovie(uniqueTitle, '2000');
    cy.get('p').contains('Release Year: 2000').should('exist');
  });

  it('should delete a movie', () => {
    cy.deleteMovie(uniqueTitle);
    cy.get('h3[class="title"]').contains(uniqueTitle).should('not.exist');
  });
});
