import { useState, createContext, useContext } from "react";

// Contexto general para todo el sitio del "carrito" de compras
const CarritoContext = createContext()

// Hook React para consultar contexto
export const useCarritoContext = () => useContext(CarritoContext)

// Definiciones y procesamiento del carrito con "props" incluidas en caso de ser necesario
export const CarritoProvider = (props) => {

    const [carrito, setCarrito] = useState([])

    /*******************************************************************************
     Funcionalidades alcanzadas por este contexto:
     ===========================================================
     1. Agregar producto:                       addItem
     2. Quitar producto:                        removeItem
     3. Vaciar carrito:                         emptyCart
     4. Obtener cantidad de productos           getItemQuantity
     5. Obtener Precio total                    totalPrice
     6. Buscar si el producto está en carrito   isInCart
    /*******************************************************************************/

    const isInCart = (id) => {
        //Find => Obj - Some => Booleano
        return carrito.some(prod => prod.id === id) //V o F
    }

    const addItem = (item, quantity) => {
        if (isInCart(item.id)) { //Consulto si el producto existe o no en el carrito
            //Consulto y seteo la cantidad en el carrito
            const indice = carrito.findIndex(prod => prod.id === item.id)
            const aux = [...carrito]
            aux[indice].quantity = quantity
            setCarrito(aux)
        } else {
            //Creo un nuevo objeto con los datos ingresados
            const newItem = {
                ...item,
                quantity: quantity //Si agrego directamente el parametro se queda con el mismo nombre
            }
            /*//Genero un aux que es igual al carrito para poder hacer el push
            const aux = carrito
            aux.push(newItem)
            setCarrito(aux)*/
            setCarrito([...carrito, newItem]) //Genero una copia del carrito + el nuevo producto
        }
    }

    const removeItem = (id) => {
        /*const aux = [...carrito]
        const indice = aux.findIndex(prod => prod.id === id)
        setCarrito(aux.splice(indice,1))*/

        //Traeme todos los productos que no tengan el id ingresado
        setCarrito(carrito.filter(prod => prod.id !== id))
    }

    const emptyCart = () => {
        setCarrito([])
    }

    const getItemQuantity = () => {
        //Devuelvo la cantidad de productos en mi carrito
        return carrito.reduce((acum, prod) => acum += prod.quantity, 0)
    }

    const totalPrice = () => {
        return carrito.reduce((acum, prod) => acum += (prod.quantity * prod.precio), 0)
    }

    return (
        // Se define lo que se va a exportar para que el resto de los componentes puedan importar. "isInCart" no se exporta ya que es una lógica interna del carrito.
        <CarritoContext.Provider value={{ carrito, addItem, removeItem, emptyCart, totalPrice, getItemQuantity }}>
            {props.children}
        </CarritoContext.Provider>
    )

}