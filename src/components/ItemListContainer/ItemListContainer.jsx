import '../App.css';
import { useState, useEffect } from 'react';
import { ItemList } from "../ItemList/ItemList"
import { useParams } from 'react-router-dom';

import { getCats, getProducts } from '../../firebase/config';


export const ItemListContainer = ({greeting}) => {

const [productos, setProductos] = useState([])
const { categoria } = useParams()

  useEffect(() => {

    if ( categoria ) {

        let cat = 1
        getCats()
        .then( cats => {  cat = cats.find(e => e.nombre === categoria).id  } )

        getProducts()
        .then( productos => {
          const productosFiltrados = productos.filter(prod => prod.idCat === cat).filter(prod => prod.vacantes > 0 )
          setProductos(productosFiltrados)

         } )
        .catch(error => console.error(error))

    }
    else {
          getProducts()
          .then( productos => {  setProductos(productos) } )
          .catch(error => console.error(error))
    }

  }, [categoria])

   return (
     <main className='principal'>
        <h1>{greeting}</h1>
        <div className="listado">
          { <ItemList productos={productos} plantilla={"Item"} /> }
        </div>
     </main>
   )
}