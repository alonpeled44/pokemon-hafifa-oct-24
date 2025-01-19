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
  const extension = useRef(null);

  // States
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedFont, setSelectedFont] = useState(fontSizes.medium);

  const [showFontExtension, setShowFontExtension] = useState(false);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setShowFontExtension(false);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); //get window width

  useEffect(() => {
    if (isDialogOpen) {
      dialog.current.close();
      if (windowWidth <= 1200) {
        dialog.current.show();
      } else {
        dialog.current.showModal();
      }
    } else {
      dialog.current.close();
    }
    setIsDialogOpen(dialog.current.open);
  }, [windowWidth, isDialogOpen]); //keep dialog open and modal / non-modal if needed

  return (
    <>
      <img
        className={css["settings-icon"]}
        src="https://img.icons8.com/?size=50&id=2969&format=png"
        alt="settings icon"
        data-open={isDialogOpen}
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
              {!(selectedTheme !== "light" && windowWidth <= 1200) && (
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
                      setSelectedTheme(windowWidth <= 1200 ? "dark" : "light");
                    }}
                    isSelected={selectedTheme === "light"}
                    caption={"Light Mode"}
                  />
                </div>
              )}
              {!(selectedTheme !== "dark" && windowWidth <= 1200) && (
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
                      setSelectedTheme(windowWidth <= 1200 ? "light" : "dark");
                    }}
                    isSelected={selectedTheme === "dark"}
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
                    if (fontSizes[fontSizeKey] !== selectedFont) {
                      return (
                        <Button
                          key={fontSizeKey}
                          fontSize={fontSizes[fontSizeKey]}
                          handleClick={() => {
                            setSelectedFont(fontSizes[fontSizeKey]);
                            setShowFontExtension(false);
                          }}
                          isSelected={false}
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
      </dialog>
    </>
  );
}
