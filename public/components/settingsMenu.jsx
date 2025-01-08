import { useEffect, useRef, useState } from "react";
import css from "../css/settings-menu.module.css";

export default function SettingsMenu() {
  //get the refrences of the elements.
  const dialog = useRef(null);
  const close = useRef(null);
  const lightMode = useRef(null);
  const darkMode = useRef(null);
  const large = useRef(null);
  const medium = useRef(null);
  const small = useRef(null);

  //states
  const [toggleDialog, setToggleDialog] = useState(false);
  const [switchTheme, setSwitchTheme] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [isLarge, setIsLarge] = useState(true);
  const [isMedium, setIsMedium] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  //remove the selected theme and font size
  const removeSelectedTheme = () => {
    lightMode.current.classList.remove(css["selected-theme"]);
    darkMode.current.classList.remove(css["selected-theme"]);
  };
  const removeSelectedFont = () => {
    large.current.classList.remove(css["selected-font"]);
    medium.current.classList.remove(css["selected-font"]);
    small.current.classList.remove(css["selected-font"]);
  };

  /* 
  assigns an event listener to window that
  when the window is resized the window width state is updated accordingly
  */
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

  /*
   updates the dialog (if needed to be modal or non-modal)
   and removes the selection class from the buttons.  
  */
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
    removeSelectedFont();
    setShowFonts(false);
    setIsMedium(false);
    setIsSmall(false);
  };

  const handleTheme = (event) => {
    if (windowWidth <= 1200) setSwitchTheme(!switchTheme);
    else {
      const clickedButton = event.target.closest("button");
      removeSelectedTheme();
      if (clickedButton === lightMode.current) {
        lightMode.current.classList.add(css["selected-theme"]);
      } else {
        darkMode.current.classList.add(css["selected-theme"]);
      }
    }
  };
  const handleFonts = (event) => {
    const clickedButton = event.target.closest("button");
    if (windowWidth <= 1200) {
      setShowFonts(!showFonts);
      //beacuse the state setter is async we need to use the previous state.
      if (!showFonts) {
        switch (clickedButton) {
          case large.current:
            setIsLarge(true);
            setIsMedium(false);
            setIsSmall(false);
            break;
          case medium.current:
            setIsLarge(false);
            setIsMedium(true);
            setIsSmall(false);
            break;
          case small.current:
            setIsLarge(false);
            setIsMedium(false);
            setIsSmall(true);
            break;
        }
      } else {
        removeSelectedFont();
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
    }

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
  };
}
