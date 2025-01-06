import { useRef, useState } from "react";
import css from "../css/settings-menu.module.css";

export default function SettingsMenu() {
  const dialog = useRef(null);
  const close = useRef(null);
  const lightMode = useRef(null);
  const darkMode = useRef(null);
  const small = useRef(null);
  const medium = useRef(null);
  const large = useRef(null);
  const [toggleFont, setToggleFont] = useState(false);

  const handleClick = () => {
    dialog.current.showModal();
  };
  const handleClose = () => {
    dialog.current.close();
  };

  const handleTheme = (event) => {
    const buttonClicked = event.target.closest("button"); //gets the clicked button
    if (buttonClicked === lightMode.current) {
      console.log("LIGHT");
      document.getElementById("modes").style.flexDirection = "row-reverse";
    } else {
      console.log("DARK");
      document.getElementById("modes").style.flexDirection = "row";
    }
  };

  const handleFontSize = (event) => {
    const buttonClicked = event.target.closest("button");
    if (!toggleFont) {
      document.getElementById("fonts").style.zIndex = "2";
    }
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
        <div>
          <div className={css.theme}>
            <h1>Theme</h1>
            <div id={"modes"}>
              <figure>
                <button ref={lightMode} onClick={handleTheme}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/606/606795.png"
                    alt="sun"
                    draggable={false}
                  />
                </button>
                <figcaption>Light Mode</figcaption>
              </figure>
              <figure>
                <button ref={darkMode} onClick={handleTheme}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/606/606807.png"
                    alt="moon"
                    draggable={false}
                  />
                </button>
                <figcaption>Dark Mode</figcaption>
              </figure>
            </div>
          </div>
          <div className={css.fontSize}>
            <h1>Font Size</h1>
            <div id={"fonts"}>
              <figure>
                <button ref={large} onClick={handleFontSize}>
                  <p id={css.large}>Aa</p>
                </button>
                <figcaption>Large</figcaption>
              </figure>
              <figure>
                <button ref={medium} onClick={handleFontSize}>
                  <p id={css.medium}>Aa</p>
                </button>
                <figcaption>Medium</figcaption>
              </figure>
              <figure>
                <button ref={small} onClick={handleFontSize}>
                  <p id={css.small}>Aa</p>
                </button>
                <figcaption>Small</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
