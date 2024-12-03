import Modal from "@/shared/components/Modal/Modal";
import { useFormik } from "formik";
import Input from "../Input/Input";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ModalProps {
  isOpen: boolean;
  setOpenModalForgot: (state: boolean) => void;
}

const initialValues = () => {
  return {
    email: "",
  };
};

const validationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .trim()
      .email("El correo no está en el formato correcto")
      .min(2, "El correo es muy corto")
      .max(100, "El correo no puede sobrepasar los 100 caracteres")
      .required("El correo es requerido"),
  });
};

const ModalForgot: React.FC<ModalProps> = ({ isOpen, setOpenModalForgot }) => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async () => submitLogin(),
  });

  const submitLogin = async () => {
    setOpenModalForgot(false);
    formik.setFieldValue("email", "");
    toast.info("Se envió la información al correo ingresado");
  };

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={formik.handleSubmit}>
        <div className="modal__header">
          <h3>Indicar correo de recuperación</h3>
        </div>
        <div className="modal__body">
          <div className="input-group">
            <Input
              name="email"
              placeholder="Correo"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <span className="input-group__error">{formik.errors.email}</span>
            )}
          </div>
        </div>
        <div className="modal__actions">
          <button type="submit" className="btn__order btn_order__cancelar">
            Enviar
          </button>
          <button
            className="btn__order btn_order__submit"
            onClick={() => setOpenModalForgot(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalForgot;
