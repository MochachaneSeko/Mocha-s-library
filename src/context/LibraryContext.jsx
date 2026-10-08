import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { STORAGE_KEYS } from '../constants.js';
import { createId } from '../utils/helpers.js';

const SEED_BOOKS = [
  { id: 'b1', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', isbn: '978-0-06-112008-4', quantity: 5 },
  { id: 'b2', title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Science', isbn: '978-0-553-38016-3', quantity: 1 },
  { id: 'b3', title: 'Long Walk to Freedom', author: 'Nelson Mandela', genre: 'Biography', isbn: '978-0-316-54818-2', quantity: 3 },
  { id: 'b4', title: 'Things Fall Apart', author: 'Chinua Achebe', genre: 'Fiction', isbn: '978-0-385-47454-2', quantity: 0 },
];

const SEED_USERS = [
  { id: 'u1', name: 'Head Librarian', membershipId: 'ADMIN001', role: 'admin', password: 'admin123' },
];

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [books, setBooks] = useLocalStorage(STORAGE_KEYS.books, SEED_BOOKS);
  const [users, setUsers] = useLocalStorage(STORAGE_KEYS.users, SEED_USERS);
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEYS.transactions, []);
  const [currentUserId, setCurrentUserId] = useLocalStorage(STORAGE_KEYS.session, null);

  const currentUser = users.find((u) => u.id === currentUserId) ?? null;

  const logTransaction = (book, type, quantity, note) => {
    setTransactions((prev) => [
      {
        id: createId(),
        bookId: book.id,
        bookTitle: book.title,
        type,
        quantity,
        note,
        performedBy: currentUser?.name ?? 'System',
        date: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const addBook = (data) => {
    const book = { id: createId(), ...data };
    setBooks((prev) => [...prev, book]);
    if (book.quantity > 0) logTransaction(book, 'add', book.quantity, 'Initial stock');
  };

  const updateBook = (id, details) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...details } : b)));
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const recordTransaction = ({ bookId, type, quantity, note }) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;
    const change = type === 'borrow' ? -quantity : quantity;
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, quantity: Math.max(0, b.quantity + change) } : b)),
    );
    logTransaction(book, type, quantity, note);
  };

  const addUser = (data) => {
    setUsers((prev) => [...prev, { id: createId(), ...data }]);
  };

  const updateUser = (id, details) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...details } : u)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const login = (membershipId, password) => {
    const user = users.find(
      (u) =>
        u.membershipId.toLowerCase() === membershipId.trim().toLowerCase() &&
        u.password === password,
    );
    if (user) setCurrentUserId(user.id);
    return user ?? null;
  };

  const logout = () => setCurrentUserId(null);

  const value = {
    books,
    users,
    transactions,
    currentUser,
    addBook,
    updateBook,
    deleteBook,
    recordTransaction,
    addUser,
    updateUser,
    deleteUser,
    login,
    logout,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used inside a LibraryProvider');
  }
  return context;
}
