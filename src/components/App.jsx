// Estilos
import './App.css';

// Rutas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes
import { NavBar } from './NavBar/NavBar';
import { ItemListContainer } from './ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './ItemDetailContainer/ItemDetailContainer';
import { Checkout } from './Checkout/Checkout';
import { Cart } from './Cart/Cart';

export const App = () => {

  // Descomentar debajo para cargar productos del archivo JSON en "../firebase/config.js"
  //createProducts()
  return (
    <>
      <main className='app'>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/category/:categoria' element={<ItemListContainer />} />
            <Route path='/product/:curso' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={ <h1>404 NOT FOUND</h1> } />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}