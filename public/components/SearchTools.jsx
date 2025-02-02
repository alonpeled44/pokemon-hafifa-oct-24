import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterItem from "./FilterItem";
import css from "../css/search-tools.module.css";
import Select from "./Select";

export default function SearchTools({
  selectedFilters,
  setSelectedFilters,
  sortMethod,
  setSortMethod,
  setSearchValue,
  types,
  setTypes,
}) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(() => {
    types && setTypes(types.filter((type) => !selectedFilters.includes(type)));
  }, [selectedFilters]);

  return (
    <div className={css.wrapper}>
      <SearchBar setSearchValue={setSearchValue} />
      <div>
        <div className={css["filter-item-container"]}>
          {selectedFilters.map((filter, index) => (
            <FilterItem
              key={index}
              filterTitle={filter}
              setSelectedFilters={setSelectedFilters}
            />
          ))}
        </div>
        <div>
          <Select
            onHeadClick={() => {
              setShowFilterOptions((prev) => types.length > 0 && !prev);
            }}
            options={types}
            showOptions={showFilterOptions}
            setShowOptions={setShowFilterOptions}
            onOptionClick={(event) => {
              setSelectedFilters((prev) => [...prev, event.target.id]);
              setTypes((prev) =>
                prev.filter((type) => type !== event.target.id)
              );
            }}
            caption={"Filter"}
          />
          <Select
            onHeadClick={() => {
              setShowSortOptions((prev) => !prev);
            }}
            options={["Id", "Reversed", "Name", "Weight", "Height"]}
            showOptions={showSortOptions}
            setShowOptions={setShowSortOptions}
            onOptionClick={(event) => {
              setSortMethod(event.target.innerText);
              setShowSortOptions(false);
            }}
            caption={sortMethod}
          />
          {(selectedFilters.length > 0 || sortMethod !== "Sort") && (
            <button
              className={css["reset-filters-btn"]}
              onClick={() => {
                setSelectedFilters([]);
                setSortMethod("Sort");
              }}
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
