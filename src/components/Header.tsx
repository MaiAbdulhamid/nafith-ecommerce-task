import "../assets/css/Header.css";
import Logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LangSwitcher from "./LangSwitcher";
import { CartIcon } from "../assets/svgs";

function Header() {
  const { cart } = useSelector((state: any) => state.allCart);
  const navigate = useNavigate();

  return (
    <nav>
      <input id="nav-toggle" type="checkbox" />
      <div className="logo">
        <img src={Logo} alt="image_logo" onClick={() => navigate("/")} />
      </div>
      <ul className="links">
        <li>
          <LangSwitcher />
        </li>
      </ul>
      <div className="icons font-bold flex mt-[21px] relative">
        <NavLink to="/cart" className="items-center ml-8">
          <div className="relative scale-75">
            <CartIcon />
            <span className="absolute -top-3 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
              {cart.length}
            </span>
          </div>
        </NavLink>
      </div>

      <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </label>
    </nav>
  );
}

export default Header;
