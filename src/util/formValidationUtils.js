export function isFormValid(movieData) {
  const errors = [];
  const currentYear = new Date().getFullYear();

  // Validation rules
  if (!movieData.title || movieData.title.length > 80) {
    errors.push('Title is required and must not exceed 80 characters.');
  }

  if (!movieData.description || movieData.description.length > 100) {
    errors.push('Description is required and must not exceed 100 characters.');
  }

  if (!movieData.genre || movieData.genre.length === 0) {
    errors.push('At least one genre is required.');
  }

  if (
    typeof movieData.rating !== 'number' ||
    movieData.rating < 1 ||
    movieData.rating > 10
  ) {
    errors.push('Rating is required and must be between 1 and 10.');
  }

  if (
    typeof movieData.releaseYear !== 'number' ||
    movieData.releaseYear < 1800 ||
    movieData.releaseYear > currentYear
  ) {
    errors.push(
      `Release year is required and must be between 1800 and ${currentYear}.`
    );
  }

  if (!movieData.coverImage) {
    errors.push('Cover image is required.');
  }

  return {
    isValid: errors.length === 0,
    errors, // Array of error messages
  };
}
