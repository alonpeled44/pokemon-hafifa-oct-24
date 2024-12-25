import { useState, useRef, useEffect } from "react";
import HeaderLinks from "./headerLinks";
import css from "../css/burger-menu.module.css";

export default function BurgerMenu() {
  const [openDialog, setOpenDialog] = useState(false);
  const dialogRef = useRef(null);
  const dialogContainerRef = useRef(null);

  const handleClick = () => {
    setOpenDialog((prevState) => {
      const newState = !prevState;
      if (dialogRef.current) {
        if (newState) {
          dialogRef.current.showModal();
        } else {
          dialogRef.current.close();
        }
      }
      return newState;
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dialogContainerRef.current &&
        !dialogContainerRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    if (openDialog) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
      <dialog ref={dialogRef} className={css.dialog} autoFocus={false}>
        <div ref={dialogContainerRef}>
          <button onClick={handleClose}>&times;</button>
          <HeaderLinks />
        </div>
      </dialog>
    </>
  );
}
