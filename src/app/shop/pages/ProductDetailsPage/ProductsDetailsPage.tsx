import Helmet from "@mongez/react-helmet";

import Breadcrumbs from "design-system/components/Breadcrumbs";
import { Skeleton } from "design-system/components/ui/skeleton";
import { useProductsDetails } from "shared/hooks/use-product-details";
import { translateText } from "shared/utils/translate-text";
import ProductDetails from "./components/ProductDetails";
import ProductInformation from "./components/ProductInformation";
import RelatedProducts from "./components/RelatedProducts";

export default function ProductsDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: productId } = params;
  const { data, error, isLoading } = useProductsDetails(productId);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto py-5 px-4 grid grid-cols-1 md:grid-cols-2 h-[600px] gap-5">
        <Skeleton className="min-h-full" />
        <Skeleton className="w-full min-h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red my-10">
        Error fetching product details: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-lightGray mb-10 px-4">
      <Helmet title="Products Page" />
      <div className="w-full max-w-[1400px] mx-auto pt-5 ">
        <Breadcrumbs title={translateText(data?.name || "") || ""} />
      </div>
      <ProductDetails product={data!} />
      <ProductInformation product={data!} />
      {data?.relatedProducts && (
        <RelatedProducts products={data?.relatedProducts} />
      )}
    </div>
  );
}
