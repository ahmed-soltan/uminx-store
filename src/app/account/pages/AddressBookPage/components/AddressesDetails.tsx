import { addressesAtom } from "app/account/atoms/address-atom";
import AddressDetailsCard from "./AddressDetailsCard";

export default function AddressesDetails() {
  const addresses = addressesAtom.useValue();

  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className="flex items-start flex-col gap-10 p-5 bg-white rounded-lg">
      {addresses.map(address => (
        <AddressDetailsCard key={address.id} address={address} />
      ))}
    </div>
  );
}
