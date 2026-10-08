import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import UserForm from '../components/UserForm.jsx';
import UserTable from '../components/UserTable.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Alert from '../components/Alert.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import useFlashMessage from '../hooks/useFlashMessage.js';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function Users() {
  useDocumentTitle('Users');
  const { users, currentUser, addUser, updateUser, deleteUser } = useLibrary();
  const [editingUser, setEditingUser] = useState(null);
  const [query, setQuery] = useState('');
  const { message, showSuccess } = useFlashMessage();

  const q = query.trim().toLowerCase();
  const visibleUsers = users.filter(
    (u) => !q || u.name.toLowerCase().includes(q) || u.membershipId.toLowerCase().includes(q),
  );

  const handleSubmit = (data) => {
    if (editingUser) {
      updateUser(editingUser.id, data);
      showSuccess(`${data.name} was updated.`);
      setEditingUser(null);
    } else {
      addUser(data);
      showSuccess(`${data.name} was added.`);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (user) => {
    if (!window.confirm(`Delete user ${user.name} (${user.membershipId})?`)) return;
    deleteUser(user.id);
    if (editingUser?.id === user.id) setEditingUser(null);
    showSuccess(`${user.name} was deleted.`);
  };

  return (
    <>
      <PageHeader title="User management" subtitle="Admin view: add, update and remove library users." />
      <Alert message={message} />

      <div className="split-layout">
        <UserForm
          key={editingUser?.id ?? 'new'}
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => setEditingUser(null)}
        />

        <section className="card">
          <div className="section-header">
            <h2>Users ({users.length})</h2>
            <SearchBar value={query} onChange={setQuery} placeholder="Search users" />
          </div>
          <UserTable
            users={visibleUsers}
            currentUserId={currentUser.id}
            editingId={editingUser?.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </>
  );
}
