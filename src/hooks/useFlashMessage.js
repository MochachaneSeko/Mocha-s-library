import { useEffect, useState } from 'react';

export default function useFlashMessage(duration = 3000) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => setMessage(null), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  const showSuccess = (text) => setMessage({ type: 'success', text });
  const showError = (text) => setMessage({ type: 'error', text });

  return { message, showSuccess, showError };
}
