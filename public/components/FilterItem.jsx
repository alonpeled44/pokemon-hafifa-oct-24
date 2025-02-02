import css from "../css/filter-item.module.css";

export default function FilterItem({ filterTitle, setSelectedFilters }) {
  const handleClick = () => {
    setSelectedFilters((prev) =>
      prev.filter((filter) => filter !== filterTitle)
    );
  };
  return (
    <p className={css["filter-item"]} onClick={handleClick}>
      {filterTitle[0].toUpperCase() + filterTitle.slice(1)}
    </p>
  );
}
