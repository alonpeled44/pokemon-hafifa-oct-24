import { useRef, useEffect } from "react";
import css from "../css/select.module.css";

export default function Select({
  onHeadClick,
  options,
  showOptions,
  setShowOptions,
  onOptionClick,
  caption,
}) {
  const wrapper = useRef(null);
  const selectHead = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !wrapper.current.contains(event.target) &&
        !selectHead.current.contains(event.target)
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
          {options.map((type, index) => (
            <p key={index} onClick={onOptionClick} id={type}>
              {type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
