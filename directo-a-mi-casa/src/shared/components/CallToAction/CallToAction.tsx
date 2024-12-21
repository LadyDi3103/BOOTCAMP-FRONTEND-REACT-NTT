import React from 'react';
import "./CallToAction.css"; 

const CallToAction: React.FC = () => {
    return (
        <section className="cta" aria-labelledby="cta-title">
            <h1 id="cta-title">
                HAZ TU PEDIDO Y RECÍBELO DESDE <span className="hours">2 HORAS</span>
            </h1>
        </section>
    );
};

export default CallToAction;
