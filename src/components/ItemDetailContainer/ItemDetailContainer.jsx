import { useState, useEffect } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom";

import { getProduct } from "../../firebase/config.js";

export const ItemDetailContainer = () => {

  const [item, setItem] = useState([])
  const { curso } = useParams()

  useEffect(() => {
      getProduct(curso).then( item => setItem(item) )
      .catch(error => console.error(error))
  }, [])

   return (

     <div className='items'>
          <ItemDetail item={item}/>
     </div>

   )
}