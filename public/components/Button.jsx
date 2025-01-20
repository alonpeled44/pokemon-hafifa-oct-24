import css from "../css/button.module.css";

export default function Button({
  caption,
  fontSize,
  content,
  isHighlighted,
  handleClick,
}) {
  return (
    <figure className={css.figure}>
      <button
        style={fontSize && { fontSize: fontSize }}
        onClick={handleClick}
        className={isHighlighted ? css["selected-setting"] : undefined}
      >
        {content}
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
