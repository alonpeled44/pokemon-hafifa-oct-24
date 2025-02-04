import { useRef, useEffect, RefObject, MouseEventHandler } from "react";
import { StateSetter } from "./FilterItem";
import css from "../css/select.module.css";
interface SelectProps {
  onHeadClick: MouseEventHandler<HTMLButtonElement>;
  options: string[];
  showOptions: boolean;
  setShowOptions: StateSetter<boolean>;
  onOptionClick: MouseEventHandler<HTMLParagraphElement>;
  caption: string;
}

export default function Select({
  onHeadClick,
  options,
  showOptions,
  setShowOptions,
  onOptionClick,
  caption,
}: SelectProps) {
  const wrapper: RefObject<HTMLDivElement> | null = useRef(null);
  const selectHead: RefObject<HTMLButtonElement> | null = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !wrapper.current.contains(event.target as HTMLElement) &&
        !selectHead.current.contains(event.target as HTMLElement)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper} ref={wrapper}>
      <button
        onClick={onHeadClick}
        ref={selectHead}
        data-options-open={showOptions}
        data-highlighted={!showOptions && !["Sort", "Filter"].includes(caption)}
      >
        {caption}
      </button>
      {options.length > 0 && showOptions && (
        <div>
          {options.map((option, index) => (
            <p key={index} onClick={onOptionClick} id={option}>
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
