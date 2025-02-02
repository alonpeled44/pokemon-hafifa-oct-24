import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import FilterItem from "./FilterItem";
import SortSelect from "./SortSelect";
import css from "../css/search-tools.module.css";

export default function SearchTools({
  setSelectedFilters,
  selectedFilters,
  setSortMethod,
  sortMethod,
  setSearchValue,
  setTypes,
  types,
}) {
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
          <FilterButton
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            setTypes={setTypes}
            types={types}
          />
          <SortSelect setSortMethod={setSortMethod} sortMethod={sortMethod} />
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
