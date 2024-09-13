import { Column } from "design-system/utils/types";
import CategoryCard from "./CategoryCard";

interface SecondRowProps {
  column: Column[];
}

export default function SecondRow({ column }: SecondRowProps) {
  const categoryHasActiveProducts = column[0].module.categories?.filter(
    category => category.totalProducts! > 0,
  );

  return (
    <div className="w-full overflow-x-auto py-5">
      <div className="flex items-center justify-start gap-5">
        {categoryHasActiveProducts?.map(category => {
          return (
            <div key={category.id} className="min-w-[150px]">
              <CategoryCard category={category} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
