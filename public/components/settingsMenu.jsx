import { useEffect, useRef, useState } from "react";
import FontSizeButton from "./fontSizeButton";
import css from "../css/settings-menu.module.css";

const fontSizes = Object.entries({
  large: "19px",
  medium: "16px",
  small: "13px",
});

export default function SettingsMenu() {
  // Get the references of the elements.
  const dialog = useRef(null);
  const close = useRef(null);
  const lightMode = useRef(null);
  const darkMode = useRef(null);
  const head = useRef(null);
  const extensions = useRef(null);

  // States
  const [toggleDialog, setToggleDialog] = useState(false);
  const [switchTheme, setSwitchTheme] = useState(false);
  const [toggleFonts, setToggleFonts] = useState(true);
  const [selectedFont, setSelectedFont] = useState(fontSizes[0][0]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Remove the selected theme and font size functions
  const removeSelectedTheme = () => {
    lightMode.current.classList.remove(css["selected-theme"]);
    darkMode.current.classList.remove(css["selected-theme"]);
  };

  useEffect(() => {
    handleShowFonts();
  }, []);

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

  const handleShowFonts = () => {
    setToggleFonts(!toggleFonts);
    windowWidth <= 1200 && !toggleFonts
      ? (extensions.current.style.display = "flex")
      : (extensions.current.style.display = "none");
  };

  const handleSelectFont = (event) => {
    const clickedButton = event.target.closest("button");
    if (extensions.current === event.target) {
      setSelectedFont(clickedButton.style.fontSize);
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
            <div>
              <div ref={head} onClick={handleShowFonts}>
                {<FontSizeButton fontSize={selectedFont} />}
              </div>
              <div ref={extensions} onClick={handleSelectFont}>
                {
                  <FontSizeButton
                    fontSize={
                      fontSizes.filter((size) => size[0] !== selectedFont)[0][1]
                    }
                  />
                }
                {
                  <FontSizeButton
                    fontSize={
                      fontSizes.filter((size) => size[0] !== selectedFont)[1][1]
                    }
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
