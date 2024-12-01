import { trans } from "@mongez/localization";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "design-system/components/ui/accordion";
import { FaMinus } from "react-icons/fa6";
import { Filters } from "shared/hooks/use-filters";
import { Checkbox } from "../../ui/checkbox";

interface AvailabilityFilterProps {
  updateInStock: (inStock: boolean) => void;
  filters: Filters;
}

export default function AvailabilityFilter({
  updateInStock,
  filters,
}: AvailabilityFilterProps) {
  return (
    <AccordionItem value="availability" className="w-full">
      <AccordionTrigger
        icon={FaMinus}
        className="uppercase text-sm md:text-xs xl:text-sm text-primary font-bold w-full text-left">
        {trans("Product Availability")}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col items-start gap-3 w-full">
        <li
          onClick={() => updateInStock(true)}
          className="flex items-center gap-2 flex-wrap">
          <Checkbox
            id="inStock"
            className="border-darkGray w-4 h-4 md:w-3 md:h-3 2xl:w-4 2xl:h-4
                 data-[state=checked]:bg-blue data-[state=checked]:border-blue"
            checked={filters.inStock === true}
          />
          <p className="text-sm md:text-xs 2xl:text-sm font-medium text-primary cursor-pointer">
            {trans("In Stock")}
          </p>
        </li>
      </AccordionContent>
    </AccordionItem>
  );
}
