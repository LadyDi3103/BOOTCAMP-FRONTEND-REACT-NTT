import React from 'react';

/**
 * Componente CallToAction
 * Muestra un mensaje destacado para incentivar pedidos rápidos con entrega desde 2 horas.
 */
const CallToAction: React.FC = () => {
    return (
        <section className="cta">
            <h1>
                HAZ TU PEDIDO Y RECÍBELO DESDE <span className="hours">2 HORAS</span>
            </h1>
        </section>
    );
};

export default CallToAction;
