import cache from "@mongez/cache";
import { atom } from "@mongez/react-atom";
import { toast } from "shared/hooks/use-toast";
import { CartType, Product } from "shared/utils/types";
import {
  addItem,
  deleteItem,
  flushCart,
  updateItem,
} from "../services/cart-services";

export const cartAtom = atom<CartType>({
  key: "cart",
  default: cache.get("cart", {}),
  beforeUpdate(cart) {
    cache.set("cart", cart);
    return cart;
  },
  actions: {
    addToCart: async (product: Product, quantity = 1) => {
      try {
        const newCart = await addItem(product.id, quantity);
        cache.set("cart", newCart.data.cart);
        return cartAtom.update(newCart.data.cart);
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },

    updateQuantity: async (itemId: number, quantity: number) => {
      const previousCart = cartAtom.value;
      const updatedCart = {
        ...previousCart,
        items: previousCart.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item,
        ),
      };
      cartAtom.update(updatedCart);

      try {
        const newCart = await updateItem(itemId, quantity);
        cache.set("cart", newCart.data.cart);
        return cartAtom.update(newCart.data.cart);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to update quantity",
          variant: "destructive",
        });
        return cartAtom.update(previousCart);
      }
    },

    deleteItem: async (itemId: number) => {
      const previousCart = cartAtom.value;
      const updatedCart = {
        ...previousCart,
        items: previousCart.items.filter(item => item.id !== itemId),
      };
      cartAtom.update(updatedCart);

      try {
        const newCart = await deleteItem(itemId);
        cache.set("cart", newCart.data.cart);
        return cartAtom.update(newCart.data.cart);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to delete item",
          variant: "destructive",
        });
        return cartAtom.update(previousCart);
      }
    },

    deleteAllItems: async () => {
      const previousCart = cartAtom.value;
      cartAtom.update({ ...previousCart, items: [] });

      try {
        const newCart = await flushCart();
        cache.set("cart", newCart.data.cart);
        return cartAtom.update(newCart.data.cart);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to clear cart",
          variant: "destructive",
        });
        return cartAtom.update(previousCart);
      }
    },
  },
});
