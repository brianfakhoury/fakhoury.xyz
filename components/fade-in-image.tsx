"use client";

import { useState, SyntheticEvent } from "react";
import Image, { ImageProps } from "next/image";

/**
 * Props interface for the FadeInImage component
 * @interface FadeInImageProps
 * @extends {ImageProps}
 * @property {string} [className] - Optional CSS class name for styling the image container
 */
interface FadeInImageProps extends ImageProps {
  className?: string;
}

/**
 * A component that renders an image with a fade-in effect when loaded
 * @param {FadeInImageProps} props - The component props including Next.js Image props
 * @returns {JSX.Element} An image component with fade-in animation
 */
const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  className = "",
  onLoad,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Handles the image load event and triggers the fade-in effect
   * @param {SyntheticEvent<HTMLImageElement, Event>} event - The load event
   */
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
