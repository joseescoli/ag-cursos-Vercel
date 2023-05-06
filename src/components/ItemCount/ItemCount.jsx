import '../App.css';
import { useCount } from '../../hooks/useCount.js';
import { useRef } from 'react';

export const ItemCount = ({ ValInicial, min, max, onAdd }) => {

const { count, minus, sum, reset } = useCount(ValInicial, min, max)

const cantRef = useRef (null)

if  ( count > 1 || count < max )       cantRef.current.style.visibility = 'visible'
if  ( count === max )   cantRef.current.style.visibility = 'hidden';

    return (
     <div className='contador'>
        <div className='contador__segmento1'>
            <div>
                <button onClick={minus}>-</button>
                <h4>{count}</h4>
                <button onClick={sum} ref={cantRef}>+</button>
            </div>
            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
        <div className='contador__segmento2'>
            <button onClick={() => onAdd(count)} disabled={!max || (max - count + 1 === 0)}>
                Agrega al carrito
            </button>
        </div>
     </div>
   )
}