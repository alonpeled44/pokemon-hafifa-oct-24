import css from "../css/button.module.css";

export default function Button({
  caption,
  fontSize,
  handleSelectFontSize,
  handleThemeSwitch,
  content,
}) {
  return (
    <figure className={css["figure"]}>
      <button
        style={fontSize && { fontSize: fontSize[1] }}
        onClick={
          handleSelectFontSize ? handleSelectFontSize : handleThemeSwitch
        }
      >
        {content}
      </button>
      <figcaption>{fontSize ? fontSize[0] : caption}</figcaption>
    </figure>
  );
}
