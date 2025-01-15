import { useRef } from "react";
import HeaderLinks from "./headerLinks";
import css from "../css/burger-menu.module.css";

export default function BurgerMenu() {
  const dialogRef = useRef(null);
  const dialogContainerRef = useRef(null);

  const handleClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleDialogClick = (event) => {
    if (!dialogContainerRef.current.contains(event.target)) {
      handleClose(); // Close the dialog if the click is outside the container
    }
  };

  return (
    <>
      <img
        className={css["burger-menu"]}
        src="https://cdn-icons-png.flaticon.com/128/7216/7216128.png"
        alt="burger-menu"
        onClick={handleClick}
      />
      <dialog
        ref={dialogRef}
        className={css.dialog}
        onClick={handleDialogClick}
        autoFocus={false}
      >
        <div ref={dialogContainerRef}>
          <button onClick={handleClose}>&times;</button>
          <HeaderLinks />
        </div>
      </dialog>
    </>
  );
}
