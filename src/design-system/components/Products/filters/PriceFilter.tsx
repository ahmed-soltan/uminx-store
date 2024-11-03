import { trans } from "@mongez/localization";
import { debounce } from "@mongez/reinforcements";
import { useState } from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "design-system/components/ui/accordion";
import { FaMinus } from "react-icons/fa6";
import { Filters } from "shared/hooks/use-filters";
import { Input } from "../../ui/input";

interface PriceFilterProps {
  updateMinPrice: (minPrice: number) => void;
  updateMaxPrice: (maxPrice: number) => void;
  filters: Filters;
}

export default function PriceFilter({
  filters,
  updateMinPrice,
  updateMaxPrice,
}: PriceFilterProps) {
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice || 0);
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || 0);

  const debouncedUpdateMinPrice = debounce((newMinPrice: number) => {
    updateMinPrice(newMinPrice);
  }, 500);

  const debouncedUpdateMaxPrice = debounce((newMaxPrice: number) => {
    updateMaxPrice(newMaxPrice);
  }, 500);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(e.target.value);
    setLocalMinPrice(newMinPrice);
    debouncedUpdateMinPrice(newMinPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(e.target.value);
    setLocalMaxPrice(newMaxPrice);
    debouncedUpdateMaxPrice(newMaxPrice);
  };

  return (
    <AccordionItem value="price" className="w-full">
      <AccordionTrigger
        icon={FaMinus}
        className="uppercase text-sm md:text-xs xl:text-sm text-primary font-bold w-full text-left">
        {trans("Product Price")}
      </AccordionTrigger>
      <AccordionContent className="flex items-center gap-2 w-full flex-nowrap md:flex-wrap xl:flex-nowrap">
        <p className="text-base text-primary">$</p>
        <Input
          id="minPrice"
          type="number"
          onChange={handleMinPriceChange}
          placeholder="From"
          value={localMinPrice?.toString()}
        />
        <Input
          id="maxPrice"
          type="number"
          onChange={handleMaxPriceChange}
          placeholder="To"
          value={localMaxPrice?.toString()}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
