// src/components/Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'; // Import your CSS module

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
