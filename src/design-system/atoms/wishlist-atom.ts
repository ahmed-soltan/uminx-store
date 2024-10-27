import cache from "@mongez/cache";
import { atom } from "@mongez/react-atom";
import { Product, Wishlist } from "../../shared/utils/types";
import {
  addItem,
  deleteItem,
  getWishlist,
} from "../services/wishlist-services";

export const wishlistAtom = atom<Wishlist>({
  key: "wishlist",
  default: cache.get("wishlist", {}),
  beforeUpdate(wishlist) {
    cache.set("wishlist", wishlist);
    return wishlist;
  },
  actions: {
    refresh() {
      wishlistAtom.update(wishlistAtom.value);
    },

    addToWishlist: async (product: Product) => {
      await addItem(product.id);
      const wishlistData = await getWishlist();
      cache.set("wishlist", wishlistData.data);
      return wishlistAtom.update(wishlistData.data);
    },

    deleteItem: async (itemId: number) => {
      await deleteItem(itemId);
      const wishlistData = await getWishlist();
      cache.set("wishlist", wishlistData.data);
      return wishlistAtom.update(wishlistData.data);
    },
  },
});
