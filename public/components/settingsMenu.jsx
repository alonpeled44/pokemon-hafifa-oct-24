import { useEffect, useRef, useState } from "react";
import css from "../css/settings-menu.module.css";

export default function SettingsMenu() {
  const dialog = useRef(null);
  const close = useRef(null);

  const handleClick = () => {
    dialog.current.showModal();
  };
  const handleClose = () => {
    dialog.current.close();
  };
  return (
    <>
      <img
        className={css.settingsIcon}
        src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png"
        alt="settings icon"
        onClick={handleClick}
      />
      <dialog ref={dialog} className={css.settingsDialog}>
        <button ref={close} onClick={handleClose}>
          &times;
        </button>
        <div className={css.theme}>
          <h1>Theme</h1>
          <div>
            <figure>
              <button>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/606/606795.png"
                  alt="sun"
                />
              </button>
              <figcaption>Light Mode</figcaption>
            </figure>
            <figure>
              <button>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/606/606807.png"
                  alt="moon"
                />
              </button>
              <figcaption>Dark Mode</figcaption>
            </figure>
          </div>
        </div>
        <div className={css.fontSize}>
          <h1>Font Size</h1>
          <div>
            <figure>
              <button>
                <p id={css.large}>Aa</p>
              </button>
              <figcaption>Large</figcaption>
            </figure>
            <figure>
              <button>
                <p id={css.medium}>Aa</p>
              </button>
              <figcaption>Medium</figcaption>
            </figure>
            <figure>
              <button>
                <p id={css.small}>Aa</p>
              </button>
              <figcaption>Small</figcaption>
            </figure>
          </div>
        </div>
      </dialog>
    </>
  );
}
