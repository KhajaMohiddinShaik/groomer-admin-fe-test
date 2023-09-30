import '../App.css';
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    // Navbar container
    <div className='Navbar'>
      <NavLink to="/admin" ><span>On board form</span></NavLink>
      <NavLink to="/search" ><span>Salon Search</span></NavLink>
    </div>
  );
}

export default NavBar;
