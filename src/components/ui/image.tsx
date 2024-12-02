import Image, { ImageProps } from "next/image";
import React from "react";

type CustomImageProps = Omit<ImageProps, "sizes"> & {
  sizes?: string;
};

export function ResponsiveImage({ 
  fill,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props 
}: CustomImageProps) {
  return (
    <Image
      fill={fill}
      sizes={fill ? sizes : undefined}
      {...props}
    />
  );
}
