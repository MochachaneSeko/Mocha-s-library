import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import BookForm from '../components/BookForm.jsx';
import BookTable from '../components/BookTable.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Alert from '../components/Alert.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useFlashMessage from '../hooks/useFlashMessage.js';
import { useLibrary } from '../context/LibraryContext.jsx';
import { matchesQuery } from '../utils/helpers.js';

export default function Books() {
  useDocumentTitle('Books');
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [editingBook, setEditingBook] = useState(null);
  const [query, setQuery] = useState('');
  const { message, showSuccess } = useFlashMessage();

  const visibleBooks = books.filter((book) => matchesQuery(book, query));

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      showSuccess(`"${data.title}" was updated.`);
      setEditingBook(null);
    } else {
      addBook(data);
      showSuccess(`"${data.title}" was added.`);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (book) => {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    deleteBook(book.id);
    if (editingBook?.id === book.id) setEditingBook(null);
    showSuccess(`"${book.title}" was deleted.`);
  };

  return (
    <>
      <PageHeader title="Book management" subtitle="Add, update and remove books from the catalogue." />
      <Alert message={message} />

      <div className="split-layout">
        <BookForm
          key={editingBook?.id ?? 'new'}
          book={editingBook}
          onSubmit={handleSubmit}
          onCancel={() => setEditingBook(null)}
        />

        <section className="card">
          <div className="section-header">
            <h2>Catalogue ({books.length})</h2>
            <SearchBar value={query} onChange={setQuery} placeholder="Search books" />
          </div>
          <BookTable books={visibleBooks} editingId={editingBook?.id} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </div>
    </>
  );
}
