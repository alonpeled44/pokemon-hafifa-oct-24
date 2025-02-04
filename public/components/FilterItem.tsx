import css from "../css/filter-item.module.css";

type stateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
interface Props {
  filterTitle: string;
  setSelectedFilters: stateSetter<string[]>;
}

export default function FilterItem({ filterTitle, setSelectedFilters }: Props) {
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
