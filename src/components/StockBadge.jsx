import { isLowStock } from '../utils/helpers.js';

export default function StockBadge({ book }) {
  if (book.quantity === 0) return <span className="badge badge-danger">Out of stock</span>;
  if (isLowStock(book)) return <span className="badge badge-warning">Low stock</span>;
  return <span className="badge badge-success">Available</span>;
}
