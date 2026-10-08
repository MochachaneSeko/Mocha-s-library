export default function FormField({ label, name, error, hint, as: Control = 'input', children, ...props }) {
  return (
    <div className={`form-field${error ? ' has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <Control id={name} name={name} aria-invalid={Boolean(error)} {...props}>
        {children}
      </Control>
      {error ? <span className="field-error">{error}</span> : hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}
