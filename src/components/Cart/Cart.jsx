import { useCarritoContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { ItemList } from "../ItemList/ItemList"

export const Cart = () => {
    const { carrito, totalPrice, emptyCart } = useCarritoContext()
    return (
        <>
            {
                carrito.length === 0 ?
                    <div className="carrito__resumen--vacio">
                        <h1>Carrito Vacio</h1>
                        <button className="carrito__resumen__continuar"><Link to={"/"}>Continuar comprando</Link></button>
                    </div>
                    :
                    <div className="carrito__resumen">
                        {<ItemList productos={carrito} plantilla={"ItemCart"} />}
                        <h1 className="carrito__resumen__total">Resumen de la compra: ${ totalPrice() }</h1>
                        <div className="carrito__resumen__botones">
                            <button className="carrito__resumen__vaciar" onClick={() => emptyCart()}>Vaciar Carrito</button>
                            <button className="carrito__resumen__continuar"><Link to={"/"}>Continuar Comprando</Link></button>
                            <button className="carrito__resumen__finalizar"><Link to={"/checkout"}>Finalizar Compra</Link></button>
                        </div>
                    </div>
            }
        </>
    )
}