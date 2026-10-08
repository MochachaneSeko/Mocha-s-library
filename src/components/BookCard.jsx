import StockBadge from './StockBadge.jsx';
import { isLowStock } from '../utils/helpers.js';

export default function BookCard({ book }) {
  return (
    <article className={`book-card${isLowStock(book) ? ' low-stock' : ''}`}>
      <div className="book-card-top">
        <span className="genre-tag">{book.genre}</span>
        <StockBadge book={book} />
      </div>
      <h3>{book.title}</h3>
      <p className="muted">by {book.author}</p>
      <div className="book-card-bottom">
        <span className="muted small">ISBN {book.isbn}</span>
        <span className="copies">
          <strong>{book.quantity}</strong> {book.quantity === 1 ? 'copy' : 'copies'}
        </span>
      </div>
    </article>
  );
}
