import { useEffect, useRef, useState } from "react";
import css from "../css/settings-menu.module.css";

export default function SettingsMenu() {
  // Get the references of the elements.
  const dialog = useRef(null);
  const close = useRef(null);
  const lightMode = useRef(null);
  const darkMode = useRef(null);
  const large = useRef(null);
  const medium = useRef(null);
  const small = useRef(null);

  // States
  const [toggleDialog, setToggleDialog] = useState(false);
  const [switchTheme, setSwitchTheme] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [fontSize, setFontSize] = useState("large");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Remove the selected theme and font size functions
  const removeSelectedTheme = () => {
    lightMode.current.classList.remove(css["selected-theme"]);
    darkMode.current.classList.remove(css["selected-theme"]);
  };
  const removeSelectedFont = () => {
    large.current.classList.remove(css["selected-font"]);
    medium.current.classList.remove(css["selected-font"]);
    small.current.classList.remove(css["selected-font"]);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (toggleDialog && dialog.current) {
      if (dialog.current.open) {
        handleClose();
      }
      if (windowWidth > 1200) {
        dialog.current.showModal();
      } else {
        dialog.current.show();
      }
    }
  }, [windowWidth, toggleDialog]);

  const handleClick = (event) => {
    setToggleDialog(!toggleDialog);

    if (!toggleDialog && dialog.current) {
      if (dialog.current.open) dialog.current.close();
      windowWidth > 1200 ? dialog.current.showModal() : dialog.current.show();
      event.target.classList.add(css["settings-open"]);
    } else {
      handleClose();
      event.target.classList.remove(css["settings-open"]);
    }
  };

  const handleClose = () => {
    dialog.current.close();
    removeSelectedFont();
    removeSelectedTheme();
  };

  const handleTheme = (event) => {
    removeSelectedTheme();
    if (windowWidth <= 1200) setSwitchTheme(!switchTheme);
    else {
      const clickedButton = event.target.closest("button");
      if (clickedButton === lightMode.current) {
        lightMode.current.classList.add(css["selected-theme"]);
      } else {
        darkMode.current.classList.add(css["selected-theme"]);
      }
    }
  };

  const handleFonts = (event) => {
    const clickedButton = event.target.closest("button");
    removeSelectedFont();
    if (windowWidth <= 1200) {
      if (showFonts) {
        setFontSize(
          clickedButton === large.current
            ? "large"
            : clickedButton === medium.current
            ? "medium"
            : "small"
        );
        setShowFonts(false);
      } else {
        setShowFonts(true);
      }
    } else {
      if (clickedButton === large.current) {
        large.current.classList.add(css["selected-font"]);
        setFontSize("large");
      } else if (clickedButton === medium.current) {
        medium.current.classList.add(css["selected-font"]);
        setFontSize("medium");
      } else {
        small.current.classList.add(css["selected-font"]);
        setFontSize("small");
      }
    }
  };

  return (
    <>
      <img
        className={css["settings-icon"]}
        src="https://img.icons8.com/?size=50&id=2969&format=png"
        alt="settings icon"
        onClick={handleClick}
      />
      <dialog ref={dialog} className={css["settings-dialog"]}>
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
          <div className={css["font-size"]}>
            <h1>Font Size</h1>
            <div data-open-fonts={showFonts}>
              <figure data-show={fontSize === "large" || showFonts}>
                <button onClick={handleFonts} ref={large}>
                  <p id={css.large}>Aa</p>
                </button>
                <figcaption>Large</figcaption>
              </figure>
              <figure data-show={fontSize === "medium" || showFonts}>
                <button onClick={handleFonts} ref={medium}>
                  <p id={css.medium}>Aa</p>
                </button>
                <figcaption>Medium</figcaption>
              </figure>
              <figure data-show={fontSize === "small" || showFonts}>
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
