import { useRef } from "react";
import { useWindowWidth } from "../context/WindowWidthContext";
import HeaderLinks from "./headerLinks";
import css from "../css/header-links-dialog.module.css";

export default function HeaderLinksDialog() {
  const dialog = useRef(null);
  const contentContainer = useRef(null);

  return (
    <>
      <img
        className={css["burger-menu"]}
        src="https://cdn-icons-png.flaticon.com/128/7216/7216128.png"
        alt="burger-menu"
        onClick={() => {
          dialog.current.showModal();
        }}
      />
      <dialog
        ref={dialog}
        className={css.dialog}
        onClick={(event) => {
          !contentContainer.current.contains(event.target) &&
            dialog.current.close();
        }}
      >
        <div ref={contentContainer}>
          <HeaderLinks />
        </div>
      </dialog>
    </>
  );
}
