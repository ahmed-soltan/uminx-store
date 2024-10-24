import { useMemo } from "react";
import { trans } from "@mongez/localization";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

import { addressesAtom } from "app/account/atoms/address-atom";
import { wishlistAtom } from "design-system/atoms/wishlist-atom";
import user from "app/account/user";
import URLS from "shared/utils/urls";
import AccountSidebarRoute from "./AccountSidebarRoute";

export default function AccountSidebar() {
  const wishlist = wishlistAtom.value;
  const addresses = addressesAtom.value;

  const handleLogout = () => {
    user.logout();
    window.location.assign(URLS.home);
  };

  const accountSidebarRoutes = useMemo(() => [
    {
      label: trans("dashboard"),
      path: URLS.auth.root,
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      label: trans("CheckOut"),
      path: URLS.checkout,
      icon: <IoMdCheckmarkCircleOutline className="w-5 h-5" />,
    },
    {
      label: trans("Address"),
      path: URLS.auth.addresses,
      icon: <IoLocationOutline className="w-5 h-5" />,
      data: addresses?.length || 0,
    },
    {
      label: trans("Wishlist"),
      path: URLS.wishlist,
      icon: <FaRegHeart className="w-5 h-5" />,
      data: wishlist?.totalWishlist || 0,
    },
    {
      label: trans("logout"),
      path: URLS.auth.logout,
      icon: <MdOutlineLogout className="w-5 h-5" />,
      onClick: handleLogout,
    },
  ], [wishlist, addresses]);

  return (
    <div className="flex items-start gap-3 flex-col px-5">
      {accountSidebarRoutes.map(route => (
        <AccountSidebarRoute key={route.label} route={route} />
      ))}
    </div>
  );
}
