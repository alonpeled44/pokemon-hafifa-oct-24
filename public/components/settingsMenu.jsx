import { useEffect, useRef, useState } from "react";
import Button from "./Button";
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
  const [toggleFonts, setToggleFonts] = useState(false);
  const [showSelectedFont, setShowSelectedFont] = useState(fontSizes[0][0]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Remove the selected theme and font size functions
  const removeSelectedTheme = () => {
    lightMode.current.children[0].children[0].classList.remove(
      css["selected-theme"]
    );
    darkMode.current.children[0].children[0].classList.remove(
      css["selected-theme"]
    );
  };

  const removeSelectFont = () => {
    const selected = document.querySelector(`.${css["selected-font-size"]}`);
    if (selected) selected.classList.remove(css["selected-font-size"]);
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
      handleShowFonts();
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
    removeSelectFont();
  };

  const handleTheme = (event) => {
    removeSelectedTheme();
    if (windowWidth <= 1200) setSwitchTheme(!switchTheme);
    else {
      const clickedButton = event.target.closest("button");
      if (clickedButton === lightMode.current.children[0].children[0]) {
        clickedButton.classList.add(css["selected-theme"]);
      } else {
        clickedButton.classList.add(css["selected-theme"]);
      }
    }
  };

  const handleShowFonts = () => {
    setToggleFonts(!toggleFonts);
    windowWidth <= 1200
      ? !toggleFonts
        ? (extensions.current.style.display = "flex")
        : (extensions.current.style.display = "none")
      : (extensions.current.style.display = "flex");
  };

  const handleSelectFontSize = (event) => {
    if (windowWidth <= 1200) {
      setShowSelectedFont(
        fontSizes.filter(
          (size) => size[1] === event.target.style.fontSize
        )[0][0]
      );
      handleShowFonts();
    } else {
      removeSelectFont();
      event.target.classList.add(css["selected-font-size"]);
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
          &times; {/* closing button!! its the times symbol (like in math) */}
        </button>
        <div>
          <div className={css.theme}>
            <h1>Theme</h1>
            <div data-switch-theme={switchTheme}>
              <div ref={lightMode}>
                <Button
                  content={
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/606/606795.png"
                      alt="sun"
                      draggable={false}
                    />
                  }
                  caption={"Light Mode"}
                  handleThemeSwitch={handleTheme}
                />
              </div>
              <div ref={darkMode}>
                <Button
                  content={
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/606/606807.png"
                      alt="moon"
                      draggable={false}
                    />
                  }
                  caption={"Dark Mode"}
                  handleThemeSwitch={handleTheme}
                />
              </div>
            </div>
          </div>
          <div className={css["font-size"]}>
            <h1>Font Size</h1>
            <div>
              <div ref={head} onClick={handleShowFonts}>
                {
                  <Button
                    fontSize={
                      fontSizes.filter(
                        (size) => size[0] === showSelectedFont
                      )[0]
                    }
                    handleSelectFontSize={handleSelectFontSize}
                    content={<p>Aa</p>}
                  />
                }
              </div>
              <div ref={extensions}>
                {
                  <Button
                    fontSize={
                      fontSizes.filter(
                        (size) => size[0] !== showSelectedFont
                      )[0]
                    }
                    handleSelectFontSize={handleSelectFontSize}
                    content={<p>Aa</p>}
                  />
                }
                {
                  <Button
                    fontSize={
                      fontSizes.filter(
                        (size) => size[0] !== showSelectedFont
                      )[1]
                    }
                    handleSelectFontSize={handleSelectFontSize}
                    content={<p>Aa</p>}
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
