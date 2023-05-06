import '../App.css';
import { useRef, useState } from 'react';

export const ItemCount = ({stock, inicial, onAdd}) => {

const [cantidad, setCantidad] = useState(inicial)

const cantRef = useRef (null)

const aumentar = () =>  {   if  (   cantidad < stock    ) setCantidad(cantidad + 1) }
const disminuir = () => {   if  (   cantidad > 1        ) setCantidad(cantidad - 1); cantRef.current.style.visibility = 'visible' }

if  ( cantidad === stock )
cantRef.current.style.visibility = 'hidden';

    return (
     <div className='contador'>
        <div>
            <button onClick={disminuir}>-</button>
            <h4>{cantidad}</h4>
            <button onClick={aumentar} ref={cantRef}>+</button>
        </div>
        <div>
            <button onClick={() => onAdd(cantidad)} disabled={!stock || (stock - cantidad + 1 === 0)}>
                Agrega al carrito
            </button>
        </div>
     </div>
   )
}