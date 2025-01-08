import { useRef, useState } from "react";
import css from "../css/settings-menu.module.css";

export default function SettingsMenu() {
  const dialog = useRef(null);
  const close = useRef(null);

  const [switchTheme, setSwitchTheme] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [isLarge, setIsLarge] = useState(true);
  const [isMedium, setIsMedium] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const handleClick = () => {
    dialog.current.showModal();
  };
  const handleClose = () => {
    dialog.current.close();
  };

  const handleTheme = () => {
    setSwitchTheme(!switchTheme);
  };
  const handleFonts = () => {
    setShowFonts(!showFonts);
    if (showFonts) {
      setIsMedium(true);
      setIsSmall(true);
    } else {
      setIsMedium(false);
      setIsSmall(false);
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
            <div data-switch-theme={switchTheme}>
              <figure>
                <button onClick={handleTheme}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/606/606795.png"
                    alt="sun"
                    draggable={false}
                  />
                </button>
                <figcaption>Light Mode</figcaption>
              </figure>
              <figure>
                <button onClick={handleTheme}>
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
            <div id={"fonts"} data-open-fonts={showFonts}>
              <figure data-show={isLarge}>
                <button onClick={handleFonts}>
                  <p id={css.large}>Aa</p>
                </button>
                <figcaption>Large</figcaption>
              </figure>
              <figure data-show={isMedium}>
                <button onClick={handleFonts}>
                  <p id={css.medium}>Aa</p>
                </button>
                <figcaption>Medium</figcaption>
              </figure>
              <figure data-show={isSmall}>
                <button onClick={handleFonts}>
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
