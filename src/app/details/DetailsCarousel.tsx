"use client";

import bg from "@/../public/bg.jpeg";
import fb from "@/../public/fallback.png";

import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageViewer from "react-simple-image-viewer";

// если элементов нет, первым элементом впихни
// bg.src!
const imgArray = [
  {
    src: bg.src,
    alt: "bg",
  },
  {
    src: fb.src,
    alt: "fb",
  },
  {
    src: bg.src,
    alt: "bg",
  },
  {
    src: fb.src,
    alt: "fb",
  },
  {
    src: bg.src,
    alt: "bg",
  },
  {
    src: fb.src,
    alt: "fb",
  },
  {
    src: bg.src,
    alt: "bg",
  },
  {
    src: fb.src,
    alt: "fb",
  },
];

const DetailsCarousel = () => {
  const [topImgIndex, setTopImgIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <div className="h-[300px] flex items-center justify-center rounded-xl bg-gray-50 border bg-card text-card-foreground shadow p-1">
        <Image
          src={imgArray[topImgIndex].src}
          alt={imgArray[topImgIndex].alt}
          width={300}
          height={200}
          className="rounded h-auto w-auto block cursor-pointer"
          onClick={() => setIsViewerOpen(true)}
        />
      </div>
      {imgArray.length > 1 && (
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full max-w-sm my-2 mx-auto"
        >
          <CarouselContent className="h-12">
            {imgArray.map((img, index) => (
              <CarouselItem
                key={index}
                className="basis-1/5 flex aspect-square items-center justify-center p-1"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={50}
                  height={50}
                  className="rounded h-auto w-auto block cursor-pointer"
                  onClick={() => setTopImgIndex(index)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      {isViewerOpen && (
        <ImageViewer
          src={imgArray.map((img) => img.src)}
          currentIndex={topImgIndex}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </>
  );
};

export default DetailsCarousel;
