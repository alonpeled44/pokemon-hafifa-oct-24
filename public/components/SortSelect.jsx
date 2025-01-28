import { useEffect, useState, useRef } from "react";
import css from "../css/sort-select.module.css";

const sortMethods = ["Id", "Reversed", "Name", "Weight", "Height"];

export default function SortSelect({ setSortMethod }) {
  const [btnValue, setBtnValue] = useState("Sort");
  const [showOptions, setShowOptions] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const wrapper = useRef(null);
  const button = useRef(null);

  const handleOpenOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleSortSelector = (event) => {
    setSortMethod(event.target.innerText);
    setBtnValue(event.target.innerText);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !wrapper.current.contains(event.target) &&
        !button.current.contains(event.target)
      )
        setShowOptions(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsHighlighted(!showOptions && btnValue !== "Sort");
  }, [showOptions, btnValue]);

  return (
    <div className={css.wrapper} ref={wrapper}>
      <button
        onClick={handleOpenOptions}
        data-options-open={showOptions}
        className={isHighlighted ? css.highlight : undefined}
        ref={button}
      >
        {btnValue}
      </button>
      {showOptions && (
        <div>
          {sortMethods.map((method, index) => (
            <p key={index} onClick={handleSortSelector}>
              {method}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
