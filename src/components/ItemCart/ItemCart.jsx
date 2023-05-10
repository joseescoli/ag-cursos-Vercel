import { useCarritoContext } from "../../context/CartContext"
export const ItemCart = ({ item }) => {
    const { removeItem } = useCarritoContext()
    return (
        <div className="carrito__resumen__elemento">
            <div className="carrito__resumen__elemento__contenedor">
                <div className="carrito__resumen__elemento__imagen">
                    <img src={item.img} alt={`Imagen de ${item.nombre}`} />
                </div>
                <div className="carrito__resumen__elemento__datos__contenedor">
                    <div className="carrito__resumen__elemento__datos">
                        <h5>{item.nombre}</h5>
                        <p>{item.dias}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio Unitario:$ {item.precio}</p>
                        <hr />
                        <h2>Subtotal: ${item.precio * item.quantity}</h2>
                        <button onClick={() => removeItem(item.id)}>🗑️</button>
                    </div>
                </div>
            </div>
        </div>
    )
}