import { MouseEvent, MouseEventHandler, RefObject, useRef } from "react";
import HeaderLinks from "./headerLinks";
import css from "../css/header-links-dialog.module.css";

export default function HeaderLinksDialog() {
  const dialog: RefObject<HTMLDialogElement | null> = useRef(null);
  const contentContainer: RefObject<HTMLDivElement> = useRef(null);

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
        onClick={(event: MouseEvent<HTMLDialogElement>): void => {
          !contentContainer.current.contains(event.target as HTMLElement) &&
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
