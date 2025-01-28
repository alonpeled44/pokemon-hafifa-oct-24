import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import SortSelect from "./SortSelect";
import css from "../css/search-tools.module.css";

export default function SearchTools({
  setFilterList,
  setSortMethod,
  setSearchValue,
}) {
  return (
    <div className={css.wrapper}>
      <SearchBar setSearchValue={setSearchValue} />
      <div>
        <FilterButton setFilterList={setFilterList} />
        <SortSelect setSortMethod={setSortMethod} />
      </div>
    </div>
  );
}
