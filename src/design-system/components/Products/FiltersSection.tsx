import { trans } from "@mongez/localization";
import { LuX } from "react-icons/lu";

import AvailabilityFilter from "design-system/components/Products/filters/AvailabilityFilter";
import CategoriesFilter from "design-system/components/Products/filters/CategoriesFilter";
import PriceFilter from "design-system/components/Products/filters/PriceFilter";
import { Accordion } from "design-system/components/ui/accordion";
import { Filters } from "shared/hooks/use-filters";
import { Button } from "../ui/button";

interface FiltersSectionProps {
  updateCategory: (categoryId: number) => void;
  updateInStock: (inStock: boolean) => void;
  updateMinPrice: (minPrice: number) => void;
  updateMaxPrice: (maxPrice: number) => void;
  resetFiltersExceptQuery: () => void;
  filters: Filters;
}

export default function FiltersSection({
  updateCategory,
  updateInStock,
  filters,
  updateMinPrice,
  updateMaxPrice,
  resetFiltersExceptQuery,
}: FiltersSectionProps) {
  const removeAllFilters = () => {
    resetFiltersExceptQuery();
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["categories", "price", "availability"]}>
      <div className="col-span-1 p-4 bg-white flex flex-col items-start gap-8 rounded-md w-full">
        <div className="flex flex-col items-start gap-5 w-full">
          {(filters.category ||
            filters.inStock ||
            filters.maxPrice ||
            filters.minPrice) && (
            <Button
              className="bg-red/10 text-red hover:bg-red/20"
              size={"sm"}
              onClick={removeAllFilters}>
              <LuX className="w-3 h-3 mr-1" />
              {trans("Remove Filters")}
            </Button>
          )}
          <CategoriesFilter filters={filters} updateCategory={updateCategory} />
        </div>
        <PriceFilter
          filters={filters}
          updateMaxPrice={updateMaxPrice}
          updateMinPrice={updateMinPrice}
        />
        <AvailabilityFilter filters={filters} updateInStock={updateInStock} />
      </div>
    </Accordion>
  );
}
