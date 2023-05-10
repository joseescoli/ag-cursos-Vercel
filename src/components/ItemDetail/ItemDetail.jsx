import { ItemCount } from "../ItemCount/ItemCount"
import { useCarritoContext } from "../../context/CartContext"

export const ItemDetail = ( {item} ) => {

  const { addItem } = useCarritoContext()

    const onAdd = (contador) => {
      addItem(item, contador)
    }

   return (
     <div className="plantilla_item">
        <img src={item.imgDetalle} alt={`Imagen de ${item.nombre}`} />
        <div className="plantilla__item__info">
                <h5>{item.nombre} - {item.dias}</h5>
                <p>Horas semanales: {item.horas}</p>
                <p>Precio: ${item.precio}</p>
                <p>Vacantes: {item.vacantes}</p>
                <ItemCount ValInicial={1} min={1} max={item.vacantes} onAdd={onAdd} />
        </div>
     </div>
   )
   
}