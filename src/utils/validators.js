import { ROLES } from '../constants.js';
import { normaliseIsbn } from './helpers.js';

const isWholeNumber = (value) => /^\d+$/.test(String(value).trim());

export function validateBook(values, books, editingId) {
  const errors = {};

  if (!values.title.trim()) errors.title = 'Title is required.';
  if (!values.author.trim()) errors.author = 'Author is required.';
  if (!values.genre) errors.genre = 'Please choose a genre.';

  const isbn = normaliseIsbn(values.isbn);
  if (!isbn) {
    errors.isbn = 'ISBN is required.';
  } else if (!/^(\d{9}[\dX]|\d{13})$/.test(isbn)) {
    errors.isbn = 'ISBN must be 10 or 13 digits.';
  } else if (books.some((b) => b.id !== editingId && normaliseIsbn(b.isbn) === isbn)) {
    errors.isbn = 'A book with this ISBN already exists.';
  }

  if (!editingId) {
    if (values.quantity === '') {
      errors.quantity = 'Initial quantity is required.';
    } else if (!isWholeNumber(values.quantity)) {
      errors.quantity = 'Quantity must be a whole number (0 or more).';
    }
  }

  return errors;
}

export function validateTransaction(values, books) {
  const errors = {};
  const book = books.find((b) => b.id === values.bookId);

  if (!book) errors.bookId = 'Please select a book.';

  if (!isWholeNumber(values.quantity) || Number(values.quantity) < 1) {
    errors.quantity = 'Quantity must be at least 1.';
  } else if (book && values.type === 'borrow' && Number(values.quantity) > book.quantity) {
    errors.quantity = `Only ${book.quantity} cop${book.quantity === 1 ? 'y' : 'ies'} in stock.`;
  }

  return errors;
}

export function validateUser(values, users, editingId) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Name is required.';

  const membershipId = values.membershipId.trim();
  if (!membershipId) {
    errors.membershipId = 'Membership ID is required.';
  } else if (!/^[A-Za-z0-9-]{3,20}$/.test(membershipId)) {
    errors.membershipId = 'Use 3-20 letters, numbers or dashes.';
  } else if (
    users.some(
      (u) => u.id !== editingId && u.membershipId.toLowerCase() === membershipId.toLowerCase(),
    )
  ) {
    errors.membershipId = 'This membership ID is already taken.';
  }

  if (!ROLES.includes(values.role)) errors.role = 'Please choose a role.';

  if (!editingId && !values.password) {
    errors.password = 'Password is required.';
  } else if (values.password && values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function validateLogin(values) {
  const errors = {};
  if (!values.membershipId.trim()) errors.membershipId = 'Membership ID is required.';
  if (!values.password) errors.password = 'Password is required.';
  return errors;
}
