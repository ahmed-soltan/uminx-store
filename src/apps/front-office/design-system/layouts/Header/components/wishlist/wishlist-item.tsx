import { FiX } from "react-icons/fi";

import { translateText } from "app/products/utils/translate-text";
import { currencyAtom } from "design-system/atoms/currency-atom";
import { Button } from "design-system/components/ui/button";
import { useDeleteWishlistItem } from "design-system/hooks/useDeleteWishlistItem";
import { formatPrice } from "design-system/lib/formats";
import { Product } from "design-system/utils/types";

interface WishlistItemProps {
  wishlistItem: Product;
  changeStatus?: () => void;
}

export default function WishlistItem({
  wishlistItem,
  changeStatus,
}: WishlistItemProps) {
  const currentCurrency = currencyAtom.useValue();

  const { deleteItem, isDeleting } = useDeleteWishlistItem(
    wishlistItem.id,
    changeStatus,
  );

  return (
    <div className="flex items-start justify-between gap-3 relative w-full">
      <div className="flex items-start gap-3">
        <div className="min-w-16 h-16 relative">
          <img
            src={wishlistItem.images[0].url}
            alt={wishlistItem.slug}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="flex items-start flex-col gap-1">
          <h1 className="text-black text-sm font-semibold line-clamp-3">
            {translateText(wishlistItem.name)}
          </h1>
          <h2 className="text-blue text-sm font-semibold">
            {formatPrice(wishlistItem.price, currentCurrency)}
          </h2>
        </div>
      </div>
      <Button variant={"ghost"} onClick={deleteItem} disabled={isDeleting}>
        <FiX className="w-4 h-4 text-red" />
      </Button>
    </div>
  );
}
