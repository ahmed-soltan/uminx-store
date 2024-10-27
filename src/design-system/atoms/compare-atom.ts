import cache from "@mongez/cache";
import { atom } from "@mongez/react-atom";
import { Compare, Product } from "../../shared/utils/types";
import { addItem, deleteItem, getCompare } from "../services/compare-services";

export const compareAtom = atom<Compare>({
  key: "compare",
  default: cache.get("compare", []),
  beforeUpdate(compare) {
    cache.set("compare", compare);
    return compare;
  },
  actions: {
    refresh() {
      compareAtom.update(compareAtom.value);
    },
    addToCompare: async (product: Product) => {
      await addItem(product.id);
      const compareData = await getCompare();
      cache.set("compare", compareData.data);
      return compareAtom.update(compareData.data);
    },

    deleteItem: async (itemId: number) => {
      await deleteItem(itemId);
      const compareData = await getCompare();
      cache.set("compare", compareData.data);
      return compareAtom.update(compareData.data);
    },
  },
});
