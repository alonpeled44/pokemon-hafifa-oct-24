import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import css from "../css/settings-menu.module.css";

const fontSizes = {
  large: "19px",
  medium: "16px",
  small: "13px",
};

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
  const [theme, setTheme] = useState("light");
  const [toggleFonts, setToggleFonts] = useState(false);
  const [selectedFont, setSelectedFont] = useState(fontSizes.medium);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Remove the selected theme and font size functions
  const removeSelectedTheme = () => {
    const selectedThemeButton = document.querySelector(
      `${css["selected-theme"]}`
    );
    selectedThemeButton &&
      selectedThemeButton.classList.remove(css["selected-theme"]);
  };

  const removeSelectFont = () => {
    const selectedFontButton = document.querySelector(
      `${css["selected-font-size"]}`
    );
    selectedFontButton &&
      selectedFontButton.classList.remove(css["selected-font-size"]);
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
  };

  const handleShowFonts = () => {
    setToggleFonts(!toggleFonts);
    windowWidth <= 1200
      ? !toggleFonts
        ? (extensions.current.style.display = "flex")
        : (extensions.current.style.display = "none")
      : (extensions.current.style.display = "flex");
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
            <div data-switch-theme={theme}>
              <div ref={lightMode}>
                <Button
                  content={
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/606/606795.png"
                      alt="sun"
                      draggable={false}
                    />
                  }
                  handleClick={() => {
                    setTheme("light");
                  }}
                  isSelected={theme === "light"}
                  caption={"Light Mode"}
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
                  handleClick={() => {
                    setTheme("dark");
                  }}
                  isSelected={theme === "dark"}
                  caption={"Dark Mode"}
                />
              </div>
            </div>
          </div>
          <div className={css["font-size"]}>
            <h1>Font Size</h1>
            <div>
              <div ref={head} onClick={handleShowFonts}>
                <Button
                  fontSize={
                    windowWidth <= 1200 ? selectedFont : fontSizes.large
                  }
                  handleClick={() => {
                    setSelectedFont(
                      windowWidth <= 1200 ? selectedFont : fontSizes.large
                    );
                  }}
                  isSelected={
                    windowWidth <= 1200
                      ? true
                      : selectedFont === fontSizes.large
                  }
                  content={<p>Aa</p>}
                  caption={"large"}
                />
              </div>
              <div ref={extensions}>
                {windowWidth <= 1200 &&
                  Object.keys(fontSizes).map((fontSizeKey) => {
                    if (fontSizes[fontSizeKey] !== selectedFont) {
                      return (
                        <Button
                          key={fontSizeKey}
                          fontSize={fontSizes[fontSizeKey]}
                          handleClick={() => {
                            setSelectedFont(fontSizes[fontSizeKey]);
                            handleShowFonts();
                          }}
                          isSelected={false}
                          content={<p>Aa</p>}
                        />
                      );
                    }
                  })}
                {windowWidth > 1200 &&
                  Object.keys(fontSizes).map((fontSizeKey) => {
                    if (fontSizeKey !== "large") {
                      return (
                        <Button
                          key={fontSizeKey}
                          fontSize={fontSizes[fontSizeKey]}
                          handleClick={() => {
                            setSelectedFont(fontSizes[fontSizeKey]);
                          }}
                          isSelected={fontSizes[fontSizeKey] === selectedFont}
                          content={<p>Aa</p>}
                          caption={fontSizeKey}
                        />
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
