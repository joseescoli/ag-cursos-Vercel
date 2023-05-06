import '../App.css';
import { useCarritoContext } from '../../context/CartContext.js';
import { Link } from "react-router-dom"

export const CartWidget = () => {
  
  const { getItemQuantity } = useCarritoContext();

   return (
     <div className='carrito'>
        { getItemQuantity() > 0 && <span>{ getItemQuantity() }</span> }
        <Link to={"/cart"}>
          <img src="https://gogeticons.com/frontend/web/icons/data/1/1/3/0/9/4/shopping%20cart_32.png" alt="Cart" />
        </Link>
     </div>
   )
}