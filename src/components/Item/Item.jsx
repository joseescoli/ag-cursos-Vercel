import { Link } from "react-router-dom"

export const Item = ({ item }) => {
    return (
        <div className="plantilla">
            <img src={item.img} alt={`Imagen del curso ${item.nombre}`} />
            <div className="plantilla__info">
                <h4>{item.nombre}</h4>
                <h5>{item.dias}</h5>
                <p>Horas semanales: {item.horas}</p>
                <p>Precio: ${item.precio}</p>
                <p>Vacantes: {item.vacantes}</p>
                {
                    item.vacantes === 0 ?
                    <p className="boton__lista">Agotado</p>
                    :
                    <Link to={`/product/${item.idF}`}><button className="boton__lista">Ver Producto</button></Link>
                }
            </div>
        </div>
    )
}