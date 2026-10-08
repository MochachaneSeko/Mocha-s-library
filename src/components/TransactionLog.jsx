import { TRANSACTION_TYPES } from '../constants.js';
import { formatDate } from '../utils/helpers.js';

export default function TransactionLog({ transactions, compact = false }) {
  if (transactions.length === 0) {
    return <p className="empty-state">No transactions recorded yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Book</th>
            <th>Type</th>
            <th>Qty</th>
            {!compact && <th>By</th>}
            {!compact && <th>Note</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td data-label="Date">{formatDate(t.date)}</td>
              <td data-label="Book">{t.bookTitle}</td>
              <td data-label="Type">
                <span className={`badge ${t.type === 'add' ? 'badge-success' : 'badge-warning'}`}>
                  {TRANSACTION_TYPES[t.type]}
                </span>
              </td>
              <td data-label="Qty">
                {t.type === 'add' ? '+' : '-'}
                {t.quantity}
              </td>
              {!compact && <td data-label="By">{t.performedBy}</td>}
              {!compact && <td data-label="Note">{t.note || '—'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
