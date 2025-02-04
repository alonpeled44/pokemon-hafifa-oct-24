import css from "../css/button.module.css";

interface Props {
  caption?: string;
  fontSize?: string;
  content: string | React.ReactNode;
  isHighlighted?: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  caption,
  fontSize,
  content,
  isHighlighted,
  handleClick,
}: Props) {
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
