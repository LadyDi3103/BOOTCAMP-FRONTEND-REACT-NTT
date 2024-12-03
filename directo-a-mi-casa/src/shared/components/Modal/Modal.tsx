import React, { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            {/* Contenido del modal */}
            <div className="modal__content">
                {/* Mensaje que se muestra */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
