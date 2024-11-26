import React from 'react';

/**
 * Props que recibe el componente Modal.
 * - `isOpen`: Booleano que indica si el modal está abierto.
 * - `onClose`: Función que se ejecuta al cerrar el modal.
 * - `message`: Mensaje que se muestra dentro del modal.
 */
interface ModalProps {
    isOpen: boolean; // Define si el modal debe mostrarse.
    onClose: () => void; // Función de cierre del modal.
    message: string; // Mensaje que se muestra en el modal.
}

/**
 * Componente Modal.
 * Muestra un mensaje en una ventana emergente (modal) con la opción de cerrarla.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
    // Si el modal no está abierto, no renderiza nada.
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            {/* Contenido del modal */}
            <div className="modal-content">
                {/* Mensaje que se muestra */}
                <p>{message}</p>

                {/* Botón para cerrar el modal */}
                <button onClick={onClose} className="modal-close-btn">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
