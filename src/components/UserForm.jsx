import FormField from './FormField.jsx';
import useForm from '../hooks/useForm.js';
import { useLibrary } from '../context/LibraryContext.jsx';
import { validateUser } from '../utils/validators.js';
import { ROLES } from '../constants.js';

const EMPTY_USER = { name: '', membershipId: '', role: 'member', password: '' };

export default function UserForm({ user, onSubmit, onCancel }) {
  const { users, currentUser } = useLibrary();
  const isEditing = Boolean(user);
  const isSelf = isEditing && user.id === currentUser?.id;

  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    isEditing ? { name: user.name, membershipId: user.membershipId, role: user.role, password: '' } : EMPTY_USER,
    (formValues) => validateUser(formValues, users, user?.id),
  );

  const submit = (formValues) => {
    const details = {
      name: formValues.name.trim(),
      membershipId: formValues.membershipId.trim().toUpperCase(),
      role: formValues.role,
    };
    if (formValues.password) details.password = formValues.password;
    onSubmit(details);
    if (!isEditing) reset();
  };

  return (
    <form className="card form" onSubmit={handleSubmit(submit)} noValidate>
      <h2>{isEditing ? 'Update user' : 'Add a new user'}</h2>

      <FormField label="Full name" name="name" value={values.name} onChange={handleChange} error={errors.name} />

      <FormField
        label="Membership ID"
        name="membershipId"
        value={values.membershipId}
        onChange={handleChange}
        error={errors.membershipId}
        placeholder="e.g. M-1023"
      />

      <FormField
        as="select"
        label="Role"
        name="role"
        value={values.role}
        onChange={handleChange}
        error={errors.role}
        disabled={isSelf}
        hint={isSelf ? "You can't change your own role." : undefined}
      >
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </FormField>

      <FormField
        label={isEditing ? 'New password (leave blank to keep)' : 'Password'}
        name="password"
        type="password"
        autoComplete="new-password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Save changes' : 'Add user'}
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
