import css from "../css/font-size-button.module.css";

export default function FontSizeButton({ fontSize }) {
  return (
    <figure className={css["font-size-figure"]}>
      <button>
        <p style={{ fontSize: fontSize }}>Aa</p>
      </button>
      <figcaption>{fontSize}</figcaption>
    </figure>
  );
}
