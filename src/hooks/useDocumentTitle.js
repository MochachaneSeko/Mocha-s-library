import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | Mocha's Library`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
