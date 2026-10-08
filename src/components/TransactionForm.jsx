import FormField from './FormField.jsx';
import useForm from '../hooks/useForm.js';
import { useLibrary } from '../context/LibraryContext.jsx';
import { validateTransaction } from '../utils/validators.js';

const EMPTY_TRANSACTION = { bookId: '', type: 'borrow', quantity: '1', note: '' };

export default function TransactionForm({ onSubmit }) {
  const { books } = useLibrary();
  const { values, errors, handleChange, handleSubmit, reset } = useForm(EMPTY_TRANSACTION, (formValues) =>
    validateTransaction(formValues, books),
  );

  const selectedBook = books.find((b) => b.id === values.bookId);

  const submit = (formValues) => {
    onSubmit({
      bookId: formValues.bookId,
      type: formValues.type,
      quantity: Number(formValues.quantity),
      note: formValues.note.trim(),
    });
    reset({ ...EMPTY_TRANSACTION, bookId: formValues.bookId, type: formValues.type });
  };

  return (
    <form className="card form" onSubmit={handleSubmit(submit)} noValidate>
      <h2>Record a transaction</h2>

      <div className="segmented" role="radiogroup" aria-label="Transaction type">
        <label className={values.type === 'borrow' ? 'active' : ''}>
          <input type="radio" name="type" value="borrow" checked={values.type === 'borrow'} onChange={handleChange} />
          Deduct (borrow)
        </label>
        <label className={values.type === 'add' ? 'active' : ''}>
          <input type="radio" name="type" value="add" checked={values.type === 'add'} onChange={handleChange} />
          Add stock
        </label>
      </div>

      <FormField
        as="select"
        label="Book"
        name="bookId"
        value={values.bookId}
        onChange={handleChange}
        error={errors.bookId}
        hint={selectedBook && `Currently in stock: ${selectedBook.quantity}`}
      >
        <option value="">Select a book</option>
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title} ({book.quantity} in stock)
          </option>
        ))}
      </FormField>

      <FormField
        label="Quantity"
        name="quantity"
        type="number"
        min="1"
        value={values.quantity}
        onChange={handleChange}
        error={errors.quantity}
      />

      <FormField
        label="Note (optional)"
        name="note"
        value={values.note}
        onChange={handleChange}
        placeholder={values.type === 'borrow' ? 'e.g. Borrowed by member M-1023' : 'e.g. Donation from school'}
      />

      <div className="form-actions">
        <button type="submit" className={`btn ${values.type === 'borrow' ? 'btn-danger' : 'btn-primary'}`}>
          {values.type === 'borrow' ? 'Deduct stock' : 'Add stock'}
        </button>
      </div>
    </form>
  );
}
