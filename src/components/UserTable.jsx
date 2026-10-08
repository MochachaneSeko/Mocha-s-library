export default function UserTable({ users, currentUserId, editingId, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p className="empty-state">No users found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership ID</th>
            <th>Role</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            return (
              <tr key={user.id} className={user.id === editingId ? 'row-editing' : ''}>
                <td data-label="Name">
                  {user.name} {isSelf && <span className="muted small">(you)</span>}
                </td>
                <td data-label="Membership ID">{user.membershipId}</td>
                <td data-label="Role">
                  <span className={`badge badge-role-${user.role}`}>{user.role}</span>
                </td>
                <td className="actions">
                  <button type="button" className="btn btn-sm btn-outline" onClick={() => onEdit(user)}>
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user)}
                    disabled={isSelf}
                    title={isSelf ? "You can't delete your own account" : undefined}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
