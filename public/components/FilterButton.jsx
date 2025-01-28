import { useEffect, useRef, useState } from "react";
import css from "../css/filter-button.module.css";

export default function FilterButton({ setFilterList, filterList, typeList }) {
  const [types, setTypes] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const wrapper = useRef(null);
  const button = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !wrapper.current.contains(event.target) &&
        !button.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setTypes(typeList);
  }, [typeList]); //when the typeList fecth promise is complete.

  useEffect(() => {
    typeList && setTypes(typeList.filter((type) => !filterList.includes(type)));
  }, [filterList]);

  const handleShowOptions = () => {
    setShowOptions((prev) => types.length > 0 && !prev);
  };

  const handleFilterSelect = (e) => {
    setFilterList((prev) => [...prev, e.target.id]);
    setTypes((prev) => prev.filter((type) => type !== e.target.id));
  };

  return (
    <div className={css.wrapper} ref={wrapper}>
      <button
        onClick={handleShowOptions}
        ref={button}
        data-options-open={showOptions}
      >
        Filter
      </button>
      {types.length > 0 && showOptions && (
        <div>
          {types.map((type, index) => (
            <p key={index} onClick={handleFilterSelect} id={type}>
              {type[0].toUpperCase() + type.slice(1)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
