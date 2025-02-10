import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterItem from "./FilterItem";
import Select from "./Select";
import { StateSetter } from "../../app/layout";
import css from "../css/search-tools.module.css";

interface Props {
  selectedFilters: string[];
  setSelectedFilters: StateSetter<string[]>;
  sortMethod: string;
  setSortMethod: StateSetter<string>;
  setSearchValue: StateSetter<string>;
  types: string[];
  setTypes: StateSetter<string[]>;
}

export default function SearchTools({
  selectedFilters,
  setSelectedFilters,
  sortMethod,
  setSortMethod,
  setSearchValue,
  types,
  setTypes,
}: Props) {
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);

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
              setSelectedFilters((prev) => [
                ...prev,
                (event.target as HTMLParagraphElement).id,
              ]);
              setTypes((prev) =>
                prev.filter(
                  (type) => type !== (event.target as HTMLParagraphElement).id
                )
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
              setSortMethod((event.target as HTMLParagraphElement).innerText);
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
