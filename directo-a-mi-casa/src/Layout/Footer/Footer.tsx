/**
 * Componente Footer
 * Muestra el pie de página de la aplicación con información de contacto, enlaces legales y redes sociales.
 */
function Footer() {
    return (
        <footer>
            {/* Contenido principal del footer */}
            <div className="footer-content">
                {/* Logo e información breve */}
                <div className="logo">
                    <img
                        src="src/assets/images/logos/logo_white.svg"
                        alt="DirectoAMiCasa"
                    />
                    <p>Todo lo que necesitas, directo a tu puerta.</p>
                </div>

                {/* Enlaces legales */}
                <div className="footer-links">
                    <span className="footer_title">Legales</span>
                    <a href="#">Política de privacidad</a>
                    <a href="#">Protección de datos personales</a>
                    <a href="#">Política de cookies</a>
                </div>

                {/* Información de contacto */}
                <div className="contact">
                    <span className="footer_title">Contacto</span>
                    <p>Teléfono: 000 000 000</p>
                    <p>Email: soporte@directoAMiCasa.com</p>
                </div>
            </div>

            {/* Redes sociales */}
            <div className="social-media">
                <a href="#">
                    <img src="src/assets/images/icons/instagram.svg" alt="Instagram" />
                </a>
                <a href="#">
                    <img src="src/assets/images/icons/tiktok.svg" alt="TikTok" />
                </a>
                <a href="#">
                    <img src="src/assets/images/icons/facebook.svg" alt="Facebook" />
                </a>
                <a href="#">
                    <img src="src/assets/images/icons/whatsapp.svg" alt="WhatsApp" />
                </a>
                <a href="#">
                    <img src="src/assets/images/icons/youtube.svg" alt="YouTube" />
                </a>
            </div>

            {/* Separador visual */}
            <div className="divider"></div>

            {/* Derechos de autor */}
            <div className="container_copyright">
                <p>&copy; 2024 DirectoAMiCasa. Todos los derechos reservados</p>
            </div>
        </footer>
    );
}

export default Footer;
