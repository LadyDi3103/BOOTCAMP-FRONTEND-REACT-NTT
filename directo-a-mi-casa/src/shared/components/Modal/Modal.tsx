import React from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    modalMessage: string;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    singleButton?: boolean;
    singleButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    modalMessage,
    onClose,
    onConfirm,
    confirmText,
    cancelText,
    singleButton = false,
    singleButtonText,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">

            {/* Contenido del modal */}
            <div className="modal-content">
                {/* Mensaje que se muestra */}
                <h3>{modalMessage}</h3>
                <div className="modal-actions">
                    {singleButton ? (
                        <button className="btn__order btn_order__submit" onClick={onClose}>
                            {singleButtonText}
                        </button>
                    ) : (
                        <>
                            {onConfirm && (
                                <button
                                    className="btn__order btn_order__cancelar"
                                    onClick={onConfirm}
                                >
                                    {confirmText}
                                </button>
                            )}
                            <button
                                className="btn__order btn_order__submit"
                                onClick={onClose}
                            >
                                {cancelText}
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Modal;
