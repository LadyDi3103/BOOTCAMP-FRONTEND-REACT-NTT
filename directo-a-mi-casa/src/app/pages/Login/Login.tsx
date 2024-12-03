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

const Login = () => {
    const [logging, setLogging] = useState(false);
    const [openModalForgot, setOpenModalForgot] = useState(false);

    const navigate = useNavigate();
    const { loginUser } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) =>
            submitLogin(formData.username, formData.password),
    });

    const submitLogin = async (username: string, password: string) => {
        try {
            setLogging(true);
            const loginData = await login(username.trim(), password.trim());
            loginUser(loginData.accessToken);
            navigate(ModuleRoutes.MarketPage);
            setLogging(false);
        } catch (error) {
            setLogging(false);
            if (error instanceof Error) {
                console.log("Error:", error.message);
                toast.error(error.message);
            }
        }
    };

    const toggleModalForgotPassword = () => {
        setOpenModalForgot(!openModalForgot);
    };

    return (
        <main className="login">
            <h1 className="login__header">Iniciar sesión</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="login__body">
                    <div className="input-group">
                        <Input
                            name="username"
                            placeholder="Nombre de usuario"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        {formik.errors.username && (
                            <span className="input-group__error">
                                {formik.errors.username}
                            </span>
                        )}
                    </div>
                    <div className="input-group">
                        <Input
                            name="password"
                            placeholder="Contraseña"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && (
                            <span className="input-group__error">
                                {formik.errors.password}
                            </span>
                        )}
                    </div>
                </div>
                <button
                    id="login-btn"
                    className="btn-load-products"
                    type="submit"
                    disabled={logging}
                >
                    {logging ? "Iniciando sesión" : "Iniciar sesión"}
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

export default Login;
