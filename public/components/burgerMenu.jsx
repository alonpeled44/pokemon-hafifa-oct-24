import { useEffect, useState, useRef } from "react";
import HeaderLinks from "./headerLinks";
import css from "../css/burgerMenu.module.css";

export default function BurgerMenu() {
  const [openDialog, setOpenDialog] = useState(false);
  const dialogRef = useRef(null);

  const handleClick = () => {
    setOpenDialog(!openDialog);
  };

  const handleOutsideClick = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setOpenDialog(false);
    }
  };

  const handleClose = () => {
    dialogRef.current.close();
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    if (openDialog) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openDialog]);

  return (
    <>
      <img
        className={css.burgerMenu}
        src="https://cdn-icons-png.flaticon.com/128/7216/7216128.png"
        alt="burger-menu"
        onClick={handleClick}
      />
      <dialog ref={dialogRef} className={css.dialog} open={openDialog}>
        <button onClick={handleClose}>&times;</button>
        <HeaderLinks />
      </dialog>
    </>
  );
}
