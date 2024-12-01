import { trans } from "@mongez/localization";
import { Link } from "@mongez/react-router";
import { useEffect, useState } from "react";
import discountSvg from "shared/assets/images/discount.svg";
import URLS from "shared/utils/urls";
import CategoryLists from "./components/category/category-list";
import SearchInput from "./components/search/search-input";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 240) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full py-[7px] transition-all  ${
        isSticky ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md" : ""
      }`}>
      <div className="hidden lg:flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4 w-full">
          <CategoryLists />
          <ul className="flex items-center gap-6 ml-5">
            <li className="text-black text-sm font-semibold hover:text-blue">
              <Link href={URLS.home}>{trans("home")}</Link>
            </li>
            <li className="text-black text-sm font-semibold hover:text-blue">
              <Link href={URLS.shop.collections}>{trans("shop")}</Link>
            </li>
            <li className="text-black text-sm font-semibold hover:text-blue">
              <Link href={URLS.pages.aboutUs}>{trans("about")}</Link>
            </li>
            <li className="text-black text-sm font-semibold hover:text-blue">
              <Link href={URLS.contactUs}>{trans("contact")}</Link>
            </li>
            <li className="text-black text-sm font-semibold hover:text-blue">
              <Link to={URLS.blog.root}>{trans("blog")}</Link>
            </li>
            <li className="text-slate-800 text-sm font-semibold hover:text-blue">
              <Link to={URLS.cart}>{trans("cart")}</Link>
            </li>
          </ul>
        </div>
        <div className="hidden xl:flex items-center gap-2 min-w-[250px] ">
          <img src={discountSvg} alt="discount" loading="lazy" />
          <span className="text-sm text-black font-semibold hover:text-blue transition">
            {trans("sale")}
          </span>
        </div>
      </div>

      <div className="flex lg:hidden mx-1">
        <SearchInput />
      </div>
    </div>
  );
}
