import { useRef, useState } from "react";
import css from "../css/settings-menu.module.css";

export default function SettingsMenu() {
  const dialog = useRef(null);
  const close = useRef(null);
  const lightMode = useRef(null);
  const darkMode = useRef(null);
  const large = useRef(null);
  const medium = useRef(null);
  const small = useRef(null);

  const [toggleDialog, setToggleDialog] = useState(true);
  const [switchTheme, setSwitchTheme] = useState(false);
  const [showFonts, setShowFonts] = useState(true);
  const [isLarge, setIsLarge] = useState(true);
  const [isMedium, setIsMedium] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const handleClick = (event) => {
    setToggleDialog(!toggleDialog);
    if (toggleDialog) {
      screen.width <= 1200 ? dialog.current.show() : dialog.current.showModal();
      event.target.classList.add(css["settings-open"]);
    } else {
      dialog.current.close();
      event.target.classList.remove(css["settings-open"]);
    }
  };
  const handleClose = () => {
    dialog.current.close();
  };

  const handleTheme = (event) => {
    if (screen.width <= 1200) setSwitchTheme(!switchTheme);
    else {
      const clickedButton = event.target.closest("button");
      if (clickedButton === lightMode.current) {
        darkMode.current.classList.remove(css["selected-theme"]);
        lightMode.current.classList.add(css["selected-theme"]);
        console.log("LIGHT");
      } else {
        lightMode.current.classList.remove(css["selected-theme"]);
        darkMode.current.classList.add(css["selected-theme"]);
        console.log("DARK");
      }
    }
  };
  const handleFonts = () => {
    if (screen.width <= 1200) {
      setShowFonts(!showFonts);
      if (showFonts) {
        setIsMedium(true);
        setIsSmall(true);
      } else {
        setIsMedium(false);
        setIsSmall(false);
      }
    } else {
      const clickedButton = event.target.closest("button");
      large.current.classList.remove(css["selected-font"]);
      medium.current.classList.remove(css["selected-font"]);
      small.current.classList.remove(css["selected-font"]);
      switch (clickedButton) {
        case large.current:
          large.current.classList.add(css["selected-font"]);
          break;
        case medium.current:
          medium.current.classList.add(css["selected-font"]);
          break;
        case small.current:
          small.current.classList.add(css["selected-font"]);
          break;
      }
    }
  };

  return (
    <>
      <img
        className={css.settingsIcon}
        src="https://img.icons8.com/?size=50&id=2969&format=png"
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
            <div data-switch-theme={switchTheme}>
              <figure>
                <button onClick={handleTheme} ref={lightMode}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/606/606795.png"
                    alt="sun"
                    draggable={false}
                  />
                </button>
                <figcaption>Light Mode</figcaption>
              </figure>
              <figure>
                <button onClick={handleTheme} ref={darkMode}>
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
            <div data-open-fonts={showFonts}>
              <figure data-show={isLarge}>
                <button onClick={handleFonts} ref={large}>
                  <p id={css.large}>Aa</p>
                </button>
                <figcaption>Large</figcaption>
              </figure>
              <figure data-show={isMedium}>
                <button onClick={handleFonts} ref={medium}>
                  <p id={css.medium}>Aa</p>
                </button>
                <figcaption>Medium</figcaption>
              </figure>
              <figure data-show={isSmall}>
                <button onClick={handleFonts} ref={small}>
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
