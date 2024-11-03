import { trans } from "@mongez/localization";
import { VscSettings } from "react-icons/vsc";

import SortFilter from "design-system/components/Products/filters/SortFilter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "design-system/components/ui/sheet";
import { Filters } from "shared/hooks/use-filters";
import { isRTL } from "shared/utils/helpers";
import FiltersSection from "./FiltersSection";

type paginationInfoType = {
  limit: number;
  page: number;
  pages: number;
  result: number;
  total: number;
};

interface FiltersSidebarSheetProps {
  updateCategory: (categoryId: number) => void;
  updateInStock: (inStock: boolean) => void;
  updateMinPrice: (minPrice: number) => void;
  updateMaxPrice: (maxPrice: number) => void;
  updateSortOptions: (sort: string) => void;
  resetFiltersExceptQuery: () => void;
  filters: Filters;
  paginationInfo: paginationInfoType;
}

export default function FiltersSidebarSheet({
  updateCategory,
  updateInStock,
  updateMinPrice,
  updateMaxPrice,
  updateSortOptions,
  resetFiltersExceptQuery,
  filters,
  paginationInfo,
}: FiltersSidebarSheetProps) {

  return (
    <Sheet>
      <SheetTrigger className="flex items-center">
        <VscSettings className="w-5 h-5 mr-2" />
        <h1 className="text-black text-sm font-bold uppercase">
          {trans("Filter and Sort")}
        </h1>
      </SheetTrigger>
      <SheetContent
        className="p-0 overflow-y-auto overflow-x-hidden scrollbar"
        side={isRTL() ? "left" : "right"}>
        <SheetHeader className="bg-lightGray p-3">
          <SheetTitle className="text-slate-900 font-semibold text-md uppercase">
            {trans("Filters and Sort")}
          </SheetTitle>
        </SheetHeader>
        <p className="text-primary text-sm font-medium text-center mt-5">
          {paginationInfo.total} {trans("Results")}
        </p>
        <div className="flex flex-col items-start mt-5">
          <div className="w-full p-2 flex items-center justify-between gap-4">
            <SortFilter
              filters={filters}
              updateSortOptions={updateSortOptions}
            />
          </div>
          <FiltersSection
            filters={filters}
            resetFiltersExceptQuery={resetFiltersExceptQuery}
            updateCategory={updateCategory}
            updateInStock={updateInStock}
            updateMaxPrice={updateMaxPrice}
            updateMinPrice={updateMinPrice}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
