import { useRef } from "react";
import { useCarritoContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { createOrdenCompra, getProduct, updateProduct } from "../../firebase/config.js"

export const Checkout = () => {
  // Referencia de formulario del cliente
  const datForm = useRef();
  const correo = useRef();
  const correo2 = useRef();

  const { carrito, totalPrice, emptyCart } = useCarritoContext()
  
  //Almacena la ruta de navegación de la página
  let navigate = useNavigate()

  const consultarForm = (e) => {
    e.preventDefault();
    
    // Función JS para convertir el HTML a objeto Iterable
    const datosFormulario = new FormData(datForm.current);
    // Función JS para utilizar función estándar de la entidad Object y pasarlo de objeto iterable a objeto simple con datos del cliente
    const cliente = Object.fromEntries(datosFormulario);

    // Se valida que ambos correos en el formulario sean idénticos. Caso contrario se arroja alerta para solicitar corrección
    if ( cliente.email === cliente.email2 ) {

      delete cliente.email2
  
      /*=================================================================================
      Procesamiento de actualización de vacantes y generación de Orden de Compra
      =================================================================================*/
      // Copio el objeto carrito a un auxiliar para procesarlo
      const filtroCarrito = [...carrito]
      
      e.target.reset()

      // Procesar carrito y descontar vacantes
      filtroCarrito.forEach(prodCarrito => {
          getProduct(prodCarrito.idF).then(prodBBD => {
              // Resto vacantes si la compra es igual o menor a la cantidad de vacantes disponibles.
              if (prodBBD.vacantes >= prodCarrito.quantity) {
                  prodBBD.vacantes -= prodCarrito.quantity

                  // Se actualiza Firebase el curso con sus vacantes descontadas
                  updateProduct(prodBBD.idF, prodBBD)
              } else {

                  // Hay compras simultáneas en curso que han finalizado y descontado la cantidad de vacantes antes de terminar esta actual compra
                  alert("Uno de los cursos comprados no cuenta con vacantes suficientes para continuar la compra. Favor de revisar las vacantes disponibles nuevamente desde el menú principal.")
                  navigate("/")
              }
          })
      })

      // Armado de detalle para orden de compra
      const OrdenCompraDetalle = filtroCarrito.map(   prod => (   { id: prod.id, quantity: prod.quantity, precio: prod.precio }   )   );

      // Armado de formato de fecha
      const fecha = new Date().toLocaleString('es-AR', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })

      // Generación de Orden de compra
      createOrdenCompra(cliente, totalPrice(), OrdenCompraDetalle, fecha)
          .then(ordenCompra => {
              alert(`🛒 ¡La compra ha finalizado con éxito!\n\nLe agradecemos por elegirnos.\nSu N° de compra es ${ordenCompra.id}.\nTotal = $${totalPrice()}.\n\nEstará recibiendo un correo a su casilla con todos los detalles.`)
              emptyCart()
              // Limpieza de formulario
              e.target.reset()
              //Se navega la ruta de navegación para redirigir a HOME
              navigate("/")
          })
          .catch(error => {
              console.error(error)
          })
      /*=================================================================================
      Fin procesamiento de actualización de vacantes y generación de Orden de Compra
      =================================================================================*/

    } else {
      // Se agrega un borde rojo en los dos casilleros de ingreso de correo para informar error
      correo.current.style.border = '5px red solid'
      correo2.current.style.border = '5px red solid'
      alert("¡Los correos ingresados no son idénticos. Favor de corregir!")
  }

  };

  return (
    <>
      {
      carrito.length === 0 ? (
        <div className="Formulario--vacio">
          <h2>Para finalizar compra debe tener productos en el carrito</h2>
          <Link to={"/"}>
            <button className="form__continuar">Continuar comprando</button>
          </Link>
        </div>
      ) : (
        <div className="Formulario">
          <form className="form__contenedor" onSubmit={consultarForm} ref={datForm}>
            <div className="form__nombre">
              <label htmlFor="nombre" className="form__nombre__label">Nombre y Apellido</label>
              <input type="text" className="form__nombre__input" name="nombre" required />
            </div>
            <div className="form__correo">
              <label htmlFor="email" className="form__correo__label">Email</label>
              <input type="email" className="form__correo__input" name="email" ref={correo} required />
            </div>
            <div className="form__correo">
              <label htmlFor="email2" className="form__correo__label">Repetir Email</label>
              <input type="email" className="form__correo__input" name="email2" ref={correo2} required />
            </div>
            <div className="form__dni">
              <label htmlFor="dni" className="form__dni__label">DNI</label>
              <input type="number" className="form__dni__input" name="dni" required />
            </div>
            <div className="form__telefono">
              <label htmlFor="celular" className="form__telefono__label">Numero telefonico</label>
              <input type="number" className="form__telefono__input" name="celular" required />
            </div>
            <div className="form__direccion">
              <label htmlFor="direccion" className="form__direccion__label">Direccion</label>
              <input type="text" className="form__direccion__input" name="direccion" required />
            </div>
            <button type="submit" className="form__enviar">Finalizar Compra</button>
          </form>
        </div>
      )}
    </>
  );
};
