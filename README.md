![](https://raw.githubusercontent.com/ndgomes/bloqhouse_crud/refs/heads/main/src/assets/logo.svg?token=GHSAT0AAAAAACVXSQYGR5OSWJE6KUN4UXT2ZZWF4QA)

# Bloqhouse Movie CRUD App

This is a simple web application built using **Vue.js 3** as the frontend framework and **Firebase** as the backend. The app allows users to manage their favorite movies by providing **CRUD** (Create, Read, Update, Delete) functionalities.

## Features

- **Create**: Add a new movie to the list.
- **Read**: View the list of favorite movies.
- **Update**: Modify movie details.
- **Delete**: Remove a movie from the list.

## Technologies Used

- **Frontend**: Vue.js 3
- **Backend**: Firebase (Firestore Database)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ndgomes/bloqhouse_crud.git
cd bloqhouse_crud
```

### 2. Install dependencies

```bash
npm install or pnpm install
```

### 3. Run the application

```bash
npm run dev
```

## How to Use

- On the homepage, you will see a list of your favorite movies.
- To add a new movie, click on the **"Add Movie"** button.
- To edit or update an existing movie, click the **"Edit"** button next to the movie.
- To delete a movie, click the **"Delete"** button next to the movie you want to remove.

## File Structure

- **src/**
  - **components/** – Contains Vue components like the modal for modal for manage movies and others.
  - **firebase.js** – Contains Firebase initialization and Firestore configurations.
  - **App.vue** – Main Vue component rendering the movie list and modals.
  - **assets/** – Holds static files like images or stylesheets.

## Notes

- This project uses Vue.js 3 and Firebase Firestore to handle CRUD operations for movies.
- You can add, update, and delete movies with the Firestore database handling persistence.
- Make sure to follow the Firebase guidelines for security rules if you plan to deploy this app publicly.
