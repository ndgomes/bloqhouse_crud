![](./src/assets/logo.svg)

# myMovies CRUD App

This is a simple web application built using **Vue.js 3** as the frontend framework and **Firebase** as the backend. The app allows users to manage their favorite movies by providing **CRUD** (Create, Read, Update, Delete) functionalities.

## Features

- **C**reate - Add a new movie to the card list.
- **R**ead - View the list of favorite movies.
- **U**pdate - Modify movie details.
- **D**elete - Remove a movie from the list.

## Technologies Used

- **Frontend**: Vue.js 3
- **Backend**: Firebase (Firestore Database)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ndgomes/myMovies_crud.git
cd myMovies_crud
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the application

```bash
pnpm dev
```

### 4. Run e2e tests

- First ensure you have application running

```bash
pnpm cypress run --spec "cypress/e2e/manage-movie.cy.js"
```

## How to Use

- On the homepage, you will see a list of cards of your favorite movies.
- To add a new movie, click on the **"Add Movie"** button on Header.
- To edit an existing movie, click on the movie you want to edit and you will be redirected to the movie details page and then click on the **"Edit"** button.
- To delete a movie, click on the movie you want to delete and you will be redirected to the movie details page and then click on the **"Delete"** button.
- To search for a movie, type in the search bar and the movies will be filtered based on the search query.

## File Structure

- **src/**
  - **components/** – Contains Vue components like the manager modal, header, and movie card.
  - **firebase.js** – Contains Firebase initialization and Firestore configurations.
  - **App.vue** – Main Vue component rendering the list of movie cards.
  - **assets/** – Holds static files like images or stylesheets.

### Notes

- Including the **.env** file in this repository is generally considered a bad practice due to security risks. However, I have intentionally left it here to simplify the setup process. This allows you to clone the project, install dependencies, and run it immediately without requiring additional configuration. All the tokens in it will soon cease to function.
