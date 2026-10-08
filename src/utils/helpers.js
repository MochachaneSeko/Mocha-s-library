import { LOW_STOCK_THRESHOLD } from '../constants.js';

export const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const isLowStock = (book) => book.quantity < LOW_STOCK_THRESHOLD;

export const normaliseIsbn = (isbn) => isbn.replace(/[-\s]/g, '').toUpperCase();

export const matchesQuery = (book, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [book.title, book.author, book.genre, book.isbn].some((field) =>
    field.toLowerCase().includes(q),
  );
};

export const formatDate = (isoString) =>
  new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
