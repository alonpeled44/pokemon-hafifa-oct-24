import { useEffect, useRef } from "react";
import css from "../css/button.module.css";

export default function Button({
  caption,
  fontSize,
  content,
  isSelected,
  handleClick,
}) {
  const button = useRef(null);

  useEffect(() => {
    if (fontSize) {
      if (window.innerWidth > 1200)
        isSelected
          ? button.current.classList.add(css["selected-font-size"])
          : button.current.classList.remove(css["selected-font-size"]);
    } else {
      if (window.innerWidth > 1200)
        isSelected
          ? button.current.classList.add(css["selected-theme"])
          : button.current.classList.remove(css["selected-theme"]);
    }
  }, [isSelected]);

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
