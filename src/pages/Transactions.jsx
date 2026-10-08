import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionLog from '../components/TransactionLog.jsx';
import Alert from '../components/Alert.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useFlashMessage from '../hooks/useFlashMessage.js';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function Transactions() {
  useDocumentTitle('Transactions');
  const { books, transactions, recordTransaction } = useLibrary();
  const [typeFilter, setTypeFilter] = useState('all');
  const { message, showSuccess } = useFlashMessage();

  const visibleTransactions =
    typeFilter === 'all' ? transactions : transactions.filter((t) => t.type === typeFilter);

  const handleSubmit = (transaction) => {
    recordTransaction(transaction);
    const book = books.find((b) => b.id === transaction.bookId);
    const verb = transaction.type === 'add' ? 'Added' : 'Deducted';
    showSuccess(`${verb} ${transaction.quantity} × "${book.title}".`);
  };

  return (
    <>
      <PageHeader title="Transactions" subtitle="Add stock when books arrive and deduct stock when they are borrowed." />
      <Alert message={message} />

      <div className="split-layout">
        {books.length === 0 ? (
          <div className="card">
            <p className="empty-state">Add a book first before recording transactions.</p>
          </div>
        ) : (
          <TransactionForm onSubmit={handleSubmit} />
        )}

        <section className="card">
          <div className="section-header">
            <h2>History ({visibleTransactions.length})</h2>
            <select
              className="filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by type"
            >
              <option value="all">All types</option>
              <option value="add">Stock added</option>
              <option value="borrow">Borrowed</option>
            </select>
          </div>
          <TransactionLog transactions={visibleTransactions} />
        </section>
      </div>
    </>
  );
}
