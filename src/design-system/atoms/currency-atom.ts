import cache from "@mongez/cache";
import { atom } from "@mongez/react-atom";

export const currencyAtom = atom<string>({
  key: "currency",
  default: cache.get("currency", "USD"),
  beforeUpdate(currency) {
    cache.set("currency", currency);
    return currency;
  },

  actions: {
    updateCurrency: (currency: string) => {
      currencyAtom.update(currency);
      cache.set("currency", currency);
    },
  },
});
