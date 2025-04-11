import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(children, modalRoot);
}
