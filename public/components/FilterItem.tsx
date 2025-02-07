import { StateSetter } from "../../app/layout";
import css from "../css/filter-item.module.css";
interface Props {
  filterTitle: string;
  setSelectedFilters: StateSetter<string[]>;
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
