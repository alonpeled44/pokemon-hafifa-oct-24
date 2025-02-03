import { RefObject, useEffect, useRef, useState } from "react";
import { useWindowWidth } from "../context/WindowWidthContext";
import Button from "./Button";
import css from "../css/settings-menu.module.css";

const fontSizes = {
  large: "19px",
  medium: "16px",
  small: "13px",
};

type stateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

interface SettingsMenuProps {
  theme: "light" | "dark";
  setTheme: stateSetter<"light" | "dark">;
  fontSize: "13px" | "16px" | "19px";
  setFontSize: stateSetter<"13px" | "16px" | "19px">;
}

export default function SettingsMenu({
  theme,
  setTheme,
  fontSize,
  setFontSize,
}: SettingsMenuProps) {
  // Get the references of the elements.
  const dialog: RefObject<HTMLDialogElement> | null = useRef(null);
  const close: RefObject<HTMLButtonElement> | null = useRef(null);

  const lightMode: RefObject<HTMLDivElement> | null = useRef(null);
  const darkMode: RefObject<HTMLDivElement> | null = useRef(null);

  const head: RefObject<HTMLDivElement> | null = useRef(null);
  const extension: RefObject<HTMLDivElement> | null = useRef(null);

  // States
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [showFontExtension, setShowFontExtension] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

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
        {windowWidth > 1200 && (
          <button
            ref={close}
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            &times; {/* closing button!! its the times symbol (like in math) */}
          </button>
        )}
        <div>
          <div className={css.theme}>
            {windowWidth > 1200 && <h1>Theme</h1>}
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
                    caption={windowWidth > 1200 && "Light Mode"}
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
                    caption={windowWidth > 1200 && "Dark Mode"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={css["font-size"]}>
            {windowWidth > 1200 && <h1>Font Size</h1>}
            <div>
              <div
                ref={head}
                onClick={() => setShowFontExtension((prev) => !prev)}
              >
                <Button
                  fontSize={windowWidth <= 1200 ? fontSize : fontSizes.large}
                  handleClick={() => {
                    setFontSize(windowWidth <= 1200 ? fontSize : "19px");
                  }}
                  isHighlighted={
                    windowWidth > 1200 && fontSize === fontSizes.large
                  }
                  content={<p>Aa</p>}
                  caption={windowWidth > 1200 && "Large"}
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
