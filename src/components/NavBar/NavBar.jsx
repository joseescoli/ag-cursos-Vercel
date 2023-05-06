import '../App.css';
import logo from './escudo.png';
import { NavLink, Link } from 'react-router-dom';

import { CartWidget } from "../CartWidget/CartWidget"

export const NavBar = () => {
   return (
        <nav className='navbar'>
            <div>
                <Link to={"/"}>
                    <img src={logo} className='logo' alt="Logo" />
                </Link>
                <ul>
                    <NavLink to={"/category/Niños"} className={({ isActive }) => isActive ? 'catActiva':'catInactiva'}>
                        <li>Niños</li>
                    </NavLink>
                    <NavLink to={"/category/Adolescentes"} className={({ isActive }) => isActive ? 'catActiva':'catInactiva'}>
                        <li>Teens</li>
                    </NavLink>
                    <NavLink to={"/category/Adultos"} className={({ isActive }) => isActive ? 'catActiva':'catInactiva'}>
                        <li>Adults</li>
                    </NavLink>
                    <NavLink to={"/category/First"} className={({ isActive }) => isActive ? 'catActiva':'catInactiva'}>
                        <li>FCE</li>
                    </NavLink>
                    <NavLink to={"/category/Acelerado"} className={({ isActive }) => isActive ? 'catActiva':'catInactiva'}>
                        <li>Acelerado</li>
                    </NavLink>
                </ul>
            </div>
            <div>
                <CartWidget />
            </div>
        </nav>
   )
}