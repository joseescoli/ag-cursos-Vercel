import '../App.css';
import { useState, useEffect } from 'react';
import { ItemList } from "../ItemList/ItemList"
import { useParams } from 'react-router-dom';

import { getCats, getProducts } from '../../firebase/config';

export const ItemListContainer = ({greeting}) => {

const [productos, setProductos] = useState([])
const { categoria } = useParams()

  useEffect(() => {

    // Se evalua si se envio listado de productos por categoría. En caso afirmativo se procesa la categoría y se la cruza con el idCat de los productos que coincidan
    if ( categoria ) {

        let cat = 1
        getCats().then( cats => {  cat = cats.find(e => e.nombre === categoria).id  } )

        getProducts()
        .then( productos => {
          // A su vez, se filtran del listado todos aquellos productos que no cuenten con vacantes disponibles
          const productosFiltrados = productos.filter(prod => prod.idCat === cat).filter(prod => prod.vacantes > 0 )
          setProductos(productosFiltrados)

         } )
        .catch(error => console.error(error))

    }
    // Caso contrario se listan todos los productos
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