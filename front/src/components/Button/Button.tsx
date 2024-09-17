// src/components/BrutalistButton.tsx
import React from 'react';
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className={styles['brutalist-button']} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
