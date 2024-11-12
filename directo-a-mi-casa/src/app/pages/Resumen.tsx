const Resumen = () => {
    return <h1>Página de Resumen</h1>;
};

export default Resumen;

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