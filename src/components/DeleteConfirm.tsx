import React, { useEffect } from 'react';
import '../styles/deleteConfirm.css';
import { DeleteConfirmProps } from '../types';

export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ id, onConfirm, onCancel }) => {
  // Закрытие модального окна при нажатии клавиши Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // Закрытие при клике за пределами модального окна
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains('delete-confirm-overlay')) {
      onCancel();
    }
  };

  return (
    <div className="delete-confirm-overlay" onClick={handleOverlayClick}>
      <div className="delete-confirm-modal">
        <button className="close-button" onClick={onCancel}>✖</button>
        <h3>Are you sure you want to delete the record with ID: <span>{id}</span>?</h3>
        <div className="delete-confirm-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};
