import { trans } from "@mongez/localization";

import { categoryAtom } from "design-system/atoms/category-atom";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "design-system/components/ui/accordion";
import { FaMinus } from "react-icons/fa6";
import { Filters } from "shared/hooks/use-filters";
import { translateText } from "shared/utils/translate-text";
import { Checkbox } from "../../ui/checkbox";

interface CategoriesFilterProps {
  updateCategory: (categoryId: number) => void;
  filters: Filters;
}

export default function CategoriesFilter({
  updateCategory,
  filters,
}: CategoriesFilterProps) {
  const data = categoryAtom.value;

  return (
    <AccordionItem value="categories" className=" w-full">
      <AccordionTrigger
        icon={FaMinus}
        className="w-full uppercase text-sm md:text-xs xl:text-sm text-primary font-bold text-left">
        {trans("Product Categories")}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col items-start gap-3">
        {data &&
          data.map(category => (
            <li
              onClick={() => updateCategory(category.id)}
              key={category.id}
              className="flex items-center gap-2 flex-wrap">
              <Checkbox
                id={category.slug}
                className="border-darkGray w-4 h-4 md:w-3 md:h-3 2xl:w-4 2xl:h-4
                       data-[state=checked]:bg-blue data-[state=checked]:border-blue"
                checked={category.id === filters.category}
              />
              <p className="text-sm md:text-xs 2xl:text-sm font-medium text-primary cursor-pointer">
                {translateText(category.name)}
              </p>
            </li>
          ))}
      </AccordionContent>
    </AccordionItem>
  );
}
