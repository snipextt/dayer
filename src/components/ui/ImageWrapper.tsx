import { FC } from "react";

interface ImageWrapperProps {
  src: string;
  alt?: string;
}

const ImageWrapper: FC<ImageWrapperProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default ImageWrapper;
