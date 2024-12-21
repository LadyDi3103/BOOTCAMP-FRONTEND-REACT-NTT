import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { login } from "@/app/services/auth/authService";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/Input/Input";
import ModalForgot from "@/components/ModalForgotPassword/ModalForgotPassword";
import { useNavigate } from "react-router-dom";
import { ModuleRoutes } from "@/app/routes/routes";
import { AuthContext } from "@/app/context/AuthContext";
import eyeIcon from "@/assets/images/icons/visibility.svg";
import eyeOffIcon from "@/assets/images/icons/visibility_off.svg";

const initialValues = () => {
    return {
        username: "",
        password: "",
    };
};

const validationSchema = () => {
    return Yup.object({
        username: Yup.string()
            .trim()
            .min(6, "El username es muy corto")
            .max(100, "El username no puede sobrepasar los 100 caracteres")
            .required("El nombre de usuario es requerido"),
        password: Yup.string()
            .trim()
            .min(7, "La contraseña es muy corta")
            .max(100, "La contraseña no puede sobrepasar los 100 caracteres")
            .required("La contraseña es requerida"),
    });
};

const LoginPage = () => {
    const [openModalForgot, setOpenModalForgot] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { loggingUser, loginUser } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnBlur: true,
        validateOnChange: true,

        onSubmit: async ({ username, password }) => {
            try {
                const { accessToken } = await login(username.trim(), password.trim());
                await loginUser(accessToken);
                navigate(ModuleRoutes.MarketPage);
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
            }
        }
    });

    const handleCustomSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = await formik.validateForm();
        console.log("Errores Formik:", errors);
        const { username, password } = formik.values;

        if (!username && !password) {
            toast.error("Por favor, ingrese el nombre de usuario y la contraseña.");
            return;
        }

        if (username && !password) {
            toast.error("Por favor, ingrese su contraseña para continuar.");
            return;
        }

        if (!username && password) {
            toast.error("Por favor, ingrese su nombre de usuario para continuar.");
            return;
        }

        if (Object.keys(errors).length > 0) {
            toast.error("Por favor, corrija los errores en el formulario.");
        } else {
            formik.handleSubmit();
        }
    };


    return (
        <div className="login-page">
            <div className="login-container">
                {/* Sección Izquierda: Formulario */}
                <section className="login-form">
                    <h1 className="login-title">¡Bienvenido de nuevo!</h1>
                    <p className="login-subtitle">Todo lo que necesitas a un solo clic.</p>

                    <form onSubmit={handleCustomSubmit}>
                        <div className="login__body">
                            {/* Username Input */}
                            <div className="login__input-group">
                                <Input
                                    placeholder="Ingresa tu nombre de usuario"
                                    {...formik.getFieldProps("username")}
                                />
                                <div className="login__input-group--error">
                                    {formik.errors.username && <span>{formik.errors.username}</span>}
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="login__input-group password-input-group">
                                <Input
                                    placeholder="Ingresa tu contraseña"
                                    type={showPassword ? "text" : "password"}
                                    {...formik.getFieldProps("password")}
                                />
                                <img
                                    src={showPassword ? eyeIcon : eyeOffIcon}
                                    alt="Toggle password visibility"
                                    className="toggle-password-icon"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                                <div className="login__input-group--error">
                                    {formik.errors.password && <span>{formik.errors.password}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            id="login-btn"
                            className="btn-load-products"
                            type="submit"
                            disabled={loggingUser}
                        >
                            {loggingUser ? "Iniciando sesión..." : "Iniciar sesión"}
                        </button>

                        {/* Forgot Password */}
                        <div className="login__footer">
                            <a
                                href="#"
                                onClick={() => setOpenModalForgot((prev) => !prev)}
                                className="login__forgot"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </section>

                {/* Sección Derecha: Imagen con Texto */}
                <section className="login-image">
                    <div className="register-message">
                        <a href="#" >¿No tienes una cuenta? <span><strong className="login__underline">Regístrate aquí</strong></span> </a>
                    </div>
                    <div className="login__container-img">
                        <img src="src/assets/images/login/online-shopping-complete.jpg" alt="Comprando desde casa" />
                    </div>
                    <div className="login-message">
                        <h2>¡Compra desde la comodidad de tu hogar!</h2>
                        <p>Ropa, perfumes y comida al alcance de tus manos.</p>
                    </div>
                </section>
            </div>

            {/* Modal Forgot Password */}
            <ModalForgot
                isOpen={openModalForgot}
                setOpenModalForgot={setOpenModalForgot}
            />
        </div>
    );
};

export default LoginPage;
