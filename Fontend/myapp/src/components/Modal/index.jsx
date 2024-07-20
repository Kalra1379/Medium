import React from 'react';
import styles from './index.module.css';

const Modal = ({ show, handleClose, title, children, footer }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <button className={styles.closeButton} onClick={handleClose}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
                {footer && <div className={styles.modalFooter}>{footer}</div>}
            </div>
        </div>
    );
};

export default Modal;
