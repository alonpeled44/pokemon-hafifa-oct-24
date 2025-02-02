import { useState, useRef } from "react";
import css from "../css/select.module.css";

export default function Select({ onClick, options, caption }) {
  const [showOptions, setShowOptions] = useState();

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
        onClick={onClick}
        ref={selectHead}
        data-show-options={showOptions}
      >
        {caption}
      </button>
      {showOptions && <div>{options}</div>}
    </div>
  );
}
