import StockBadge from './StockBadge.jsx';
import { isLowStock } from '../utils/helpers.js';

export default function BookTable({ books, editingId, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty-state">No books found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Qty</th>
            <th>Status</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className={`${isLowStock(book) ? 'row-low-stock' : ''}${book.id === editingId ? ' row-editing' : ''}`}
            >
              <td data-label="Title">{book.title}</td>
              <td data-label="Author">{book.author}</td>
              <td data-label="Genre">{book.genre}</td>
              <td data-label="ISBN">{book.isbn}</td>
              <td data-label="Qty">{book.quantity}</td>
              <td data-label="Status">
                <StockBadge book={book} />
              </td>
              <td className="actions">
                <button type="button" className="btn btn-sm btn-outline" onClick={() => onEdit(book)}>
                  Update
                </button>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => onDelete(book)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
