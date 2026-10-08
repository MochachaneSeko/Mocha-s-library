import FormField from './FormField.jsx';
import useForm from '../hooks/useForm.js';
import { validateLogin } from '../utils/validators.js';

export default function LoginForm({ onSubmit, error }) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { membershipId: '', password: '' },
    validateLogin,
  );

  return (
    <form className="card form login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>Sign in</h1>
      <p className="muted">Use your library membership ID and password.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <FormField
        label="Membership ID"
        name="membershipId"
        autoComplete="username"
        value={values.membershipId}
        onChange={handleChange}
        error={errors.membershipId}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      <button type="submit" className="btn btn-primary btn-block">
        Log in
      </button>

      <p className="field-hint demo-hint">
        Demo admin: <code>ADMIN001</code> / <code>admin123</code>
      </p>
    </form>
  );
}
