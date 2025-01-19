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
    <figure className={css.figure}>
      <button
        ref={button}
        style={fontSize && { fontSize: fontSize }}
        onClick={handleClick}
        className={
          windowWidth > 1200 && isSelected ? css["selected-setting"] : undefined
        }
      >
        {content}
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
