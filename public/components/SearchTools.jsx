import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import FilterItem from "./FilterItem";
import SortSelect from "./SortSelect";
import css from "../css/search-tools.module.css";

export default function SearchTools({
  setFilterList,
  filterList,
  setSortMethod,
  sortMethod,
  setSearchValue,
  typeList,
}) {
  const handleClick = () => {
    setFilterList([]);
    setSortMethod("Sort");
  };
  return (
    <div className={css.wrapper}>
      <SearchBar setSearchValue={setSearchValue} />
      <div>
        <div className={css["filter-item-container"]}>
          {filterList.map((filter, index) => (
            <FilterItem
              key={index}
              filterTitle={filter}
              setFilterList={setFilterList}
            />
          ))}
        </div>
        <div>
          <FilterButton
            setFilterList={setFilterList}
            filterList={filterList}
            typeList={typeList}
          />
          <SortSelect setSortMethod={setSortMethod} sortMethod={sortMethod} />
          {(filterList.length > 0 || sortMethod !== "Sort") && (
            <button className={css["reset-filters-btn"]} onClick={handleClick}>
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
