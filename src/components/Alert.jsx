export default function Alert({ message }) {
  if (!message) return null;
  return (
    <div className={`alert alert-${message.type}`} role="status">
      {message.text}
    </div>
  );
}
