export const LOW_STOCK_THRESHOLD = 2;

export const ROLES = ['admin', 'librarian', 'member'];

export const STAFF_ROLES = ['admin', 'librarian'];

export const GENRES = [
  'Fiction',
  'Non-fiction',
  'Science',
  'History',
  'Biography',
  'Children',
  'Technology',
  'Poetry',
  'Other',
];

export const TRANSACTION_TYPES = {
  add: 'Stock added',
  borrow: 'Borrowed',
};

export const STORAGE_KEYS = {
  books: 'library.books',
  users: 'library.users',
  transactions: 'library.transactions',
  session: 'library.session',
};
