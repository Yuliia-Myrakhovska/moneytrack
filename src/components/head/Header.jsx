import { Link } from "react-router-dom";
import Nav from "./nav/Nav";
import logo from "../../img/logo.svg";
import style from "./header.module.css";

function Header() {
  return (
    <header className={style.container}>
      <Link className={style.logo} to="/">
        <img className={style.logoImg} src={logo} alt="logo" />
        <h1>MoneyTrack</h1>
      </Link>
      <nav>
        <Link to="/statistics" className={style.link}>
          <Nav />
        </Link>
      </nav>
    </header>
  );
}
export default Header;
