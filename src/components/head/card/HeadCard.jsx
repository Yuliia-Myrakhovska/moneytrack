import style from "./headcard.module.css";
import hryvnia from "../../../img/hryvnia.png";

function HeadCard({ sum, index }) {
  const monthNamesUA = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const currentDate = new Date();
  const currentMonthName = monthNamesUA[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  let label = "";
  if (index === 0) label = currentMonthName;
  else if (index === 1) label = "Останні 6 місяців";
  else if (index === 2) label = currentYear.toString();
  return (
    <div className={style.container}>
      <div className={style.data}>{label}</div>
      <div className={style.block}>
        <img className={style.hryvnia} src={hryvnia} alt="hryvnia" />
        <div className={style.price}>{sum}</div>
      </div>
    </div>
  );
}
export default HeadCard;
