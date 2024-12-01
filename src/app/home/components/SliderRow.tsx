import Autoplay from "embla-carousel-autoplay";
import React from "react";

import { trans } from "@mongez/localization";
import { Link } from "@mongez/react-router";
import { Button } from "design-system/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "design-system/components/ui/carousel";
import { translateText } from "shared/utils/translate-text";
import { Column } from "shared/utils/types";
import URLS from "shared/utils/urls";

interface SliderRowProps {
  column: Column[];
}

export default function SliderRow({ column }: SliderRowProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const handleMouseEnter = () => {
    plugin.current.stop();
  };

  const handleMouseLeave = () => {
    plugin.current.play();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 w-full min-h-[385px]">
      <div className="md:col-span-2 h-full w-full rounded-md">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full rounded-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <CarouselContent className="w-full relative h-full rounded-md">
            {column[0].module.slider?.banners.map(banner => (
              <CarouselItem
                key={banner.id}
                className="w-full relative min-h-full rounded-md"
                style={{
                  width: banner.image[0].value.width,
                  height: banner.image[0].value.height,
                }}>
                <img
                  loading="lazy"
                  src={banner.image[0].value.url}
                  alt=""
                  className="w-full h-full rounded-md"
                />
                <div className="absolute top-32 left-5 md:left-10 xl:left-28 flex flex-col items-start gap-5 text-white w-[300px] lg:w-[360px]">
                  <h1 className="text-2xl lg:text-4xl font-bold">
                    {translateText(banner.title)}
                  </h1>
                  <Button
                    variant={"outline"}
                    asChild
                    size={"lg"}
                    className="rounded-full text-black font-bold text-xs">
                    <Link href={URLS.shop.collections}>
                      {trans("SHOP NOW")}
                    </Link>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-[50%] left-5 w-12 h-12 bg-white/30 ring-0 border-0 hover:bg-white" />
          <CarouselNext className="top-[50%] right-3 w-12 h-12 bg-white/30 ring-0 border-0 hover:bg-white" />
        </Carousel>
      </div>
      <div className="flex flex-col sm:flex-row md:items-center lg:flex-col gap-2 h-full justify-between w-full">
        <div className="relative max-h-[200px] lg:h-full w-full overflow-hidden group">
          <img
            loading="lazy"
            src={column[1].module.banner?.image[0].value.url}
            alt=""
            className="w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute top-5 left-5 md:top-10 md:left-10 flex flex-col items-start gap-5 text-white w-[190px]">
            <h1 className="text-xl md:text-2xl font-medium">
              {translateText(column[1].module.banner?.title || "")}
            </h1>
          </div>
        </div>
        <div className="relative max-h-[200px] lg:h-full w-full overflow-hidden group">
          <img
            loading="lazy"
            src={column[2].module.banner?.image[0].value.url}
            alt=""
            className="w-full h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute top-5 left-5 md:top-10 md:left-10 flex flex-col items-start gap-5 text-white w-[190px]">
            <h1 className="text-xl md:text-2xl font-medium">
              {translateText(column[2].module.banner?.title || "")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
