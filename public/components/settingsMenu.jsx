import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import css from "../css/settings-menu.module.css";

const fontSizes = {
  large: "19px",
  medium: "16px",
  small: "13px",
};

export default function SettingsMenu({
  theme,
  setTheme,
  fontSize,
  setFontSize,
}) {
  // Get the references of the elements.
  const dialog = useRef(null);
  const close = useRef(null);

  const lightMode = useRef(null);
  const darkMode = useRef(null);

  const head = useRef(null);
  const extension = useRef(null);

  // States
  const [windowWidth, setWindowWidth] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFontExtension, setShowFontExtension] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dialog.current.close();
    if (isDialogOpen) {
      windowWidth <= 1200 ? dialog.current.show() : dialog.current.showModal();
    }
    setIsDialogOpen(dialog.current.open);
  }, [isDialogOpen, windowWidth]);

  return (
    <>
      <img
        className={css["settings-icon"]}
        src="https://img.icons8.com/?size=50&id=2969&format=png"
        alt="settings icon"
        onClick={() => {
          setIsDialogOpen((prev) => !prev);
        }}
      />
      <dialog ref={dialog} className={css["settings-dialog"]}>
        <button
          ref={close}
          onClick={() => {
            setIsDialogOpen(false);
          }}
        >
          &times; {/* closing button!! its the times symbol (like in math) */}
        </button>
        <div>
          <div className={css.theme}>
            <h1>Theme</h1>
            <div>
              {!(theme !== "light" && windowWidth <= 1200) && (
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
                      setTheme(windowWidth <= 1200 ? "dark" : "light");
                    }}
                    isHighlighted={theme === "light" && windowWidth > 1200}
                    caption={"Light Mode"}
                  />
                </div>
              )}
              {!(theme !== "dark" && windowWidth <= 1200) && (
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
                      setTheme(windowWidth <= 1200 ? "light" : "dark");
                    }}
                    isHighlighted={theme === "dark" && windowWidth > 1200}
                    caption={"Dark Mode"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={css["font-size"]}>
            <h1>Font Size</h1>
            <div>
              <div
                ref={head}
                onClick={() => setShowFontExtension((prev) => !prev)}
              >
                <Button
                  fontSize={windowWidth <= 1200 ? fontSize : fontSizes.large}
                  handleClick={() => {
                    setFontSize(
                      windowWidth <= 1200 ? fontSize : fontSizes.large
                    );
                  }}
                  isHighlighted={
                    windowWidth > 1200 && fontSize === fontSizes.large
                  }
                  content={<p>Aa</p>}
                  caption={"large"}
                />
              </div>
              {windowWidth <= 1200 && (
                <div
                  ref={extension}
                  style={{
                    display:
                      windowWidth <= 1200
                        ? showFontExtension
                          ? "flex"
                          : "none"
                        : "flex",
                  }}
                >
                  {Object.keys(fontSizes).map((fontSizeKey) => {
                    if (fontSizes[fontSizeKey] !== fontSize) {
                      return (
                        <Button
                          key={fontSizeKey}
                          fontSize={fontSizes[fontSizeKey]}
                          handleClick={() => {
                            setFontSize(fontSizes[fontSizeKey]);
                            setShowFontExtension(false);
                          }}
                          isHighlighted={false}
                          content={<p>Aa</p>}
                        />
                      );
                    }
                  })}
                </div>
              )}
              {windowWidth > 1200 &&
                Object.keys(fontSizes).map((fontSizeKey) => {
                  if (fontSizeKey !== "large") {
                    return (
                      <Button
                        key={fontSizeKey}
                        fontSize={fontSizes[fontSizeKey]}
                        handleClick={() => {
                          setFontSize(fontSizes[fontSizeKey]);
                        }}
                        isHighlighted={
                          fontSizes[fontSizeKey] === fontSize &&
                          windowWidth > 1200
                        }
                        content={<p>Aa</p>}
                        caption={fontSizeKey}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
