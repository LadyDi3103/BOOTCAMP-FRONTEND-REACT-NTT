import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CategoryTitleContainer from "../../../shared/components/CategoryTitleContainer";
import './Resumen.css';
import { Product } from '../../domain/Product';

const ResumenPage = () => {
  const { state, dispatch } = useCart();
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    distrito: '',
    direccion: '',
    referencia: '',
    celular: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /**
 * Falta 🔴 validar que exista un producto para que el usuario pueda enviar el formulario 
 */
  console.log('Estado del carrito:', state.products);

  const normalizeProduct = (product: Partial<Product>): Product => ({
    id: product.id || 0,
    title: product.title || '',
    name: product.name || '',
    description: product.description || '',
    price: product.price || 0,
    thumbnail: product.thumbnail || '',
    category: product.category || '',
    quantity: Number(product.quantity) || 0,
  });

  state.products = state.products.map(normalizeProduct);

  const handleIncrement = (productId: number) => {
    dispatch({ type: 'INCREMENT_QUANTITY', productId });
  };

  const handleDecrement = (productId: number) => {
    dispatch({ type: 'DECREMENT_QUANTITY', productId });
  };

  const handleRemove = (productId: number) => {
    dispatch({ type: 'REMOVE_PRODUCT', productId });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (value.trim() === '') {
      setErrors({ ...errors, [name]: 'Campo obligatorio' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    Object.keys(form).forEach(key => {
      if (form[key as keyof typeof form].trim() === '') {
        newErrors[key] = 'Campo obligatorio';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    alert('Su pedido se registró con éxito');
    console.log('Formulario enviado:', form);
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.products
    .reduce((sum, product) => sum + product.price * (Number(product.quantity) || 0), 0)
    .toFixed(2);
  return (
    <>
      <CategoryTitleContainer
        title={'Resumen de Órden'}
      />
      <div className="order-summary">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map(product => (
              <tr key={product.id}>
                <td><img src={product.thumbnail} alt={product.name} width="80" /></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <div className="quantity-controls">
                    <button className="quantity-btn decrement" onClick={() => handleDecrement(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button className="quantity-btn increment" onClick={() => handleIncrement(product.id)}>+</button>
                  </div>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleRemove(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-container">
          <span>Total a pagar:</span> <strong>S/{total}</strong>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          {['nombre', 'apellidos', 'distrito', 'direccion', 'referencia', 'celular'].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
              />
              {errors[field] && <span className="error-message">{errors[field]}</span>}
            </div>
          ))}
          <div className='btn__form'>
            <button type="submit" className="btn_order__submit">
              <img
                src="src/assets/images/icons/white_car.svg"
                alt="Carrito"
                className="cart-icon"
                onError={(e) => {
                  console.error("Error al cargar el icono del carrito:", e);
                }}
              />
              Ordenar
            </button>

            <button
              type="button"
              className="btn_order__cancelar"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Cancelar Orden
            </button>
          </div>

        </form>
      </div>
    </>

  )

};

export default ResumenPage;

// Se deberá crear una nueva página llamada Resumen el cual permita visualizar la lista de productos
// agregado al carrito dandole la opción al usuario de poder eliminar, agregar o reducir más elementos. Como
// primera columna estará la imagen en miniatura, como segunda el nombre, como tercera el precio del
// producto, como cuarta la cantidad junto a los controles de incremento y decremento, en la quinta el botón
// eliminar. Asi mismo en la parte inferior de la tabla deberá mostrar el total a pagar.
// - Para la gestión de rutas usarán react-router-dom como librería.
// - Los botones incremento y decremento deberá modificar el número especificado en la caja de resumen, así
// mismo, deberán cambiar el valor del icono de carrito.
// - El botón eliminar deberá remover de la tabla el producto y actualizar el contador del icono de carrito.
// - El precio total deberá actualizarse en base a la cantidad de productos que tenga la tabla. Ref
// - Para los estados globales se deberá usar useReducer, context y provider está prohibido usar librerías de
// tercero para manejar estados globales.
// Fecha de entrega máx. 24/11
// - Se deberá agregar una sección debajo del resumen que será un formulario para el envío de los productos.
// - El formulario tendrá los campos nombres, apellidos, distrito, dirección, referencia, celular y un botón en la parte inferior
// que diga comprar.
// - Todos los campos del formulario son obligatorios por lo que se deberá validar cada uno de ellos con los valores que
// corresponda, por ejm: para el campo nombre no debería aceptarse números y en caso se agreguen deberá mostrar un
// mensaje de error indicando "Debe ingresar un valor válido" y cuando ingrese el valor válido, este mensaje deberá
// desaparecer. Esta misma idea deberá replicarse para cada campo.
// - El campo distrito será un desplegable el cual cargue su contenido mediante un custom hook que leera un archivo JSON
// con una estructura que deberá definir el participante.
// - Al presionar en el botón comprar, si el formulario está vacío deberá mostrar debajo de cada campo el mensaje "Campo
// obligatorio".
// - Al presionar en el botón comprar, si todos los campos fueron completados el sistema mostrará una alerta personalizada
// indicando que su pedido se registro con éxito y a nivel de consola deberá mostrarse una estructura de datos con los
// valores que ingreso el usuario por ejm: { nombre: "MAX", apellido: "Collazos", telefono: "123421421", …etc }.
// - Luego de que el mensaje de compra exitosa aparezca y el usuario presiona en aceptar, el sistema deberá limpiar los
// datos del carrito, tabla resumen y redirigirlo a la página de inicio de market con todos los valores reseteados