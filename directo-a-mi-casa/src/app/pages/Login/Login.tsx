import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { login } from "@/app/services/auth/authService";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/Input/Input";


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

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) =>
            submitLogin(formData.username, formData.password),
    });

    const submitLogin = async (username: string, password: string) => {
        try {
            setLogging(true);
            await login(username.trim(), password.trim());
            setLogging(false);
        } catch (error) {
            setLogging(false);
            if (error instanceof Error) {
                console.log("Error:", error.message);
                toast.error(error.message);
            }
        }
    };

    return (
        <main className="below-navbar login">
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
            </form>
        </main>
    );
};

export default Login;
