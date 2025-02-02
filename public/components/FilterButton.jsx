import { useEffect, useRef, useState } from "react";
import css from "../css/filter-button.module.css";

export default function FilterButton({
  selectedFilters,
  setSelectedFilters,
  setTypes,
  types,
}) {
  const [showOptions, setShowOptions] = useState(false);

  const wrapper = useRef(null);
  const filterHead = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !wrapper.current.contains(event.target) &&
        !filterHead.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    types && setTypes(types.filter((type) => !selectedFilters.includes(type)));
  }, [selectedFilters]);

  return (
    <div className={css.wrapper} ref={wrapper}>
      <button
        onClick={() => setShowOptions((prev) => types.length > 0 && !prev)}
        ref={filterHead}
        data-options-open={showOptions}
      >
        Filter
      </button>
      {types.length > 0 && showOptions && (
        <div>
          {types.map((type, index) => (
            <p
              key={index}
              onClick={(e) => {
                setSelectedFilters((prev) => [...prev, e.target.id]);
                setTypes((prev) => prev.filter((type) => type !== e.target.id));
              }}
              id={type}
            >
              {type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
