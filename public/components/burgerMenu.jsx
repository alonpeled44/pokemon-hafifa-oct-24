import HeaderLinks from "./headerLinks";
import css from "../css/burgerMenu.module.css";

export default function BurgerMenu() {
  const handleClick = () => {
    const dialog = document.getElementById("dialog");
    dialog.open = true;
  };
  return (
    <div>
      <img
        className={css.burgerMenu}
        src="https://cdn-icons-png.flaticon.com/128/7216/7216128.png"
        alt="burger-menu"
        onClick={handleClick}
      />
      <dialog id="dialog"></dialog>
    </div>
  );
}
