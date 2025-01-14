import css from "../css/button.module.css";

export default function Button({ caption, fontSize, content, isSelected }) {
  const handleClick = (event) => {
    if (isSelected) {
      event.target.classList.add(css["selected-theme"]);
    }
  };
  return (
    <figure className={css["figure"]}>
      <button style={fontSize && { fontSize: fontSize }} onClick={handleClick}>
        {content}
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
