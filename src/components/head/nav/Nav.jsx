import { useState, useEffect } from "react";
import finance from "../../../img/finance.svg";
import style from "./nav.module.css";

function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <img src={finance} alt="Статистика" className={style.img} />
  ) : (
    <div className={style.font}>Статистика</div>
  );
}
export default Nav;
