"use client";

import { useState, SyntheticEvent } from "react";
import Image, { ImageProps } from "next/image";

interface FadeInImageProps extends ImageProps {
  className?: string;
}

const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  className = "",
  onLoad,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(event);
    }
  };

  return (
    <div>
      {isLoading && <div className={className}></div>}

      <Image
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={`${className} transition-opacity duration-500 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        {...props}
      />
    </div>
  );
};

export default FadeInImage;
