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
            .min(2, "El username es muy corto")
            .max(100, "El username no puede sobrepasar los 100 caracteres")
            .required("El username es requerido"),
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
        onSubmit: async (formData) =>
            submitLogin(formData.username, formData.password),
    });

    const submitLogin = async (username: string, password: string) => {
        try {
            const loginData = await login(username.trim(), password.trim());
            loginUser(loginData.accessToken);
            navigate(ModuleRoutes.MarketPage, { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                
                toast.error(error.message);
            }
        }
    };

    const toggleModalForgotPassword = () => {
        setOpenModalForgot(!openModalForgot);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className="login">
            <h1 className="login__header">Iniciar sesión</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="login__body">
                    <div className="login__input-group">
                        <Input
                            name="username"
                            placeholder="Nombre de usuario"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <div className="login__input-group--error">
                            {formik.errors.username}
                        </div>
                    </div>
                    <div className="login__input-group password-input-group">
                        <Input
                            name="password"
                            placeholder="Contraseña"
                            type={showPassword ? "text" : "password"}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <img
                            src={showPassword ? eyeIcon : eyeOffIcon}
                            alt="Toggle password visibility"
                            className="toggle-password-icon"
                            onClick={toggleShowPassword}
                        />
                        <div className="login__input-group--error">
                            {formik.errors.password}
                        </div>
                    </div>
                </div>
                <button
                    id="login-btn"
                    className="btn-load-products"
                    type="submit"
                    disabled={loggingUser}
                >
                    {loggingUser ? "Iniciando sesión" : "Iniciar sesión"}
                </button>
                <div className="login__footer">
                    <a
                        href="#"
                        onClick={toggleModalForgotPassword}
                        className="login__forgot"
                    >
                        Olvidé contraseña
                    </a>
                </div>
            </form>
            <ModalForgot
                isOpen={openModalForgot}
                setOpenModalForgot={setOpenModalForgot}
            />
        </main>
    );
};

export default LoginPage;
