import css from "../css/filter-item.module.css";

interface FilterItemProps {
  filterTitle: string;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FilterItem({
  filterTitle,
  setSelectedFilters,
}: FilterItemProps) {
  return (
    <p
      className={css["filter-item"]}
      onClick={() => {
        setSelectedFilters((prev) =>
          prev.filter((filter) => filter !== filterTitle)
        );
      }}
    >
      {filterTitle}
    </p>
  );
}
