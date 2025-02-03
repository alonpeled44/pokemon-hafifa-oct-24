import css from "../css/button.module.css";

interface ButtonProps {
  caption: string;
  fontSize?: string;
  content: string;
  isHighlighted?: boolean;
  handleClick: () => void;
}

export default function Button({
  caption,
  fontSize,
  content,
  isHighlighted,
  handleClick,
}: ButtonProps) {
  return (
    <figure className={css.figure}>
      <button
        style={fontSize ? { fontSize } : {}}
        onClick={handleClick}
        className={isHighlighted ? css["selected-setting"] : undefined}
      >
        {content}
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
