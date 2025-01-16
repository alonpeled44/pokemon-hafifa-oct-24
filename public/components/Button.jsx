import { useEffect, useRef, useState } from "react";
import css from "../css/button.module.css";

export default function Button({
  caption,
  fontSize,
  content,
  isSelected,
  handleClick,
}) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const button = useRef(null);

  useEffect(() => {
    if (fontSize) {
      if (window.innerWidth > 1200)
        isSelected
          ? button.current.classList.add(css["selected-font-size"])
          : button.current.classList.remove(css["selected-font-size"]);
      else button.current.classList.remove(css["selected-font-size"]);
    } else {
      if (window.innerWidth > 1200) {
        isSelected
          ? button.current.classList.add(css["selected-theme"])
          : button.current.classList.remove(css["selected-theme"]);
      } else {
        button.current.classList.remove(css["selected-theme"]);
      }
    }
  }, [isSelected, windowWidth]);

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

  return (
    <figure className={css["figure"]}>
      <button
        ref={button}
        style={fontSize && { fontSize: fontSize }}
        onClick={handleClick}
      >
        {content}
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
