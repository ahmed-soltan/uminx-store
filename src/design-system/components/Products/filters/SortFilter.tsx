import { trans } from "@mongez/localization";
import { Filters } from "shared/hooks/use-filters";
import { SORT_OPTIONS } from "shared/utils/data";

interface SortFilterProps {
  filters: Filters;
  updateSortOptions: (value: string) => void;
}

export default function SortFilter({
  filters,
  updateSortOptions,
}: SortFilterProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSortOptions(e.target.value);
  };
  return (
    <>
      <label htmlFor="sort" className="text-sm text-gray font-medium">
        {trans("Sort By")}:{" "}
      </label>
      <select
        id="sort"
        value={filters.sort}
        onChange={handleSortChange}
        className="text-sm font-medium ring-0 focus:ring-0 focus-visible:ring-0">
        {SORT_OPTIONS.map(option => (
          <option
            key={option.value}
            value={option.value}
            className="text-primary">
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
