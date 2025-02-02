import css from "../css/filter-item.module.css";

export default function FilterItem({ filterTitle, setSelectedFilters }) {
  return (
    <p
      className={css["filter-item"]}
      onClick={() => {
        setSelectedFilters((prev) =>
          prev.filter((filter) => filter !== filterTitle)
        );
      }}
    >
      {filterTitle[0].toUpperCase() + filterTitle.slice(1)}
    </p>
  );
}
