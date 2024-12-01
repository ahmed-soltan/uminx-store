import cache from "@mongez/cache";
import { atom } from "@mongez/react-atom";
import {
  addAddress,
  deleteAddress,
  setPrimaryAddress,
  updateAddress,
} from "design-system/services/address.services";
import { Address } from "shared/utils/types";

export const addressesAtom = atom<Address[]>({
  key: "addresses",
  default: cache.get("addresses", []),
  beforeUpdate(addresses) {
    cache.set("addresses", addresses);
    return addresses;
  },
  actions: {
    addAddress: async (data: Address) => {
      const response = await addAddress(data);
      addressesAtom.update(response.data.addresses);
      cache.set("addresses", response.data.addresses);
      return response.data.address.id;
    },
    setPrimaryAddress: async (addressId: number) => {
      const response = await setPrimaryAddress(addressId);
      addressesAtom.update(response.data.addresses);
      cache.set("addresses", response.data.addresses);
    },
    deleteAddress: async (addressId: number) => {
      const response = await deleteAddress(addressId);
      addressesAtom.update(response.data.addresses);
      cache.set("addresses", response.data.addresses);
    },
    updateAddress: async (addressId: number, addressData: Address) => {
      const response = await updateAddress(addressId, addressData);
      addressesAtom.update(response.data.addresses);
      cache.set("addresses", response.data.addresses);
    },
  },
});
