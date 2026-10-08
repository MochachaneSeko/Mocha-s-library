import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import BookCard from '../components/BookCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TransactionLog from '../components/TransactionLog.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useLibrary } from '../context/LibraryContext.jsx';
import { isLowStock, matchesQuery } from '../utils/helpers.js';
import { LOW_STOCK_THRESHOLD, STAFF_ROLES } from '../constants.js';

export default function Dashboard() {
  useDocumentTitle('Dashboard');
  const { books, users, transactions, currentUser } = useLibrary();
  const [query, setQuery] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const isStaff = STAFF_ROLES.includes(currentUser.role);
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0);
  const lowStockCount = books.filter(isLowStock).length;
  const visibleBooks = books.filter(
    (book) => matchesQuery(book, query) && (!lowStockOnly || isLowStock(book)),
  );

  return (
    <>
      <PageHeader title={`Welcome, ${currentUser.name}`} subtitle="Current book availability at a glance." />

      <section className="stats-grid">
        <StatCard label="Book titles" value={books.length} />
        <StatCard label="Copies in stock" value={totalCopies} />
        <StatCard
          label={`Low stock (under ${LOW_STOCK_THRESHOLD})`}
          value={lowStockCount}
          variant={lowStockCount > 0 ? 'warning' : 'default'}
        />
        {isStaff && <StatCard label="Registered users" value={users.length} />}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Book availability</h2>
          <div className="toolbar">
            <SearchBar value={query} onChange={setQuery} placeholder="Search title, author, genre, ISBN" />
            <label className="checkbox">
              <input type="checkbox" checked={lowStockOnly} onChange={(e) => setLowStockOnly(e.target.checked)} />
              Low stock only
            </label>
          </div>
        </div>

        {visibleBooks.length === 0 ? (
          <p className="empty-state">No books match your filters.</p>
        ) : (
          <div className="card-grid">
            {visibleBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      {isStaff && (
        <section className="section">
          <div className="section-header">
            <h2>Recent transactions</h2>
            <Link to="/transactions" className="link">
              View all
            </Link>
          </div>
          <TransactionLog transactions={transactions.slice(0, 5)} compact />
        </section>
      )}
    </>
  );
}
