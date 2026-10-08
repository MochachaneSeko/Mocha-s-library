import FormField from './FormField.jsx';
import useForm from '../hooks/useForm.js';
import { useLibrary } from '../context/LibraryContext.jsx';
import { validateBook } from '../utils/validators.js';
import { GENRES } from '../constants.js';

const EMPTY_BOOK = { title: '', author: '', genre: '', isbn: '', quantity: '' };

export default function BookForm({ book, onSubmit, onCancel }) {
  const { books } = useLibrary();
  const isEditing = Boolean(book);

  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    isEditing
      ? { title: book.title, author: book.author, genre: book.genre, isbn: book.isbn, quantity: String(book.quantity) }
      : EMPTY_BOOK,
    (formValues) => validateBook(formValues, books, book?.id),
  );

  const submit = (formValues) => {
    const details = {
      title: formValues.title.trim(),
      author: formValues.author.trim(),
      genre: formValues.genre,
      isbn: formValues.isbn.trim(),
    };
    if (isEditing) {
      onSubmit(details);
    } else {
      onSubmit({ ...details, quantity: Number(formValues.quantity) });
      reset();
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit(submit)} noValidate>
      <h2>{isEditing ? 'Update book' : 'Add a new book'}</h2>

      <FormField label="Title" name="title" value={values.title} onChange={handleChange} error={errors.title} />
      <FormField label="Author" name="author" value={values.author} onChange={handleChange} error={errors.author} />

      <FormField as="select" label="Genre" name="genre" value={values.genre} onChange={handleChange} error={errors.genre}>
        <option value="">Select a genre</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </FormField>

      <FormField
        label="ISBN"
        name="isbn"
        value={values.isbn}
        onChange={handleChange}
        error={errors.isbn}
        placeholder="e.g. 978-0-06-112008-4"
      />

      {isEditing ? (
        <p className="field-hint">
          Current stock: <strong>{book.quantity}</strong>. Change stock on the Transactions page.
        </p>
      ) : (
        <FormField
          label="Initial quantity"
          name="quantity"
          type="number"
          min="0"
          value={values.quantity}
          onChange={handleChange}
          error={errors.quantity}
        />
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Save changes' : 'Add book'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
