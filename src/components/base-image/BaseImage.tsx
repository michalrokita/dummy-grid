import { useEffect, useState } from 'react';
import NoImageSrc from '../../img/no-image.png';
import LoadingIndicatorSvg from '../../img/loading.svg';

type BaseImageProps = {
  src: string;
  alt?: string;
  title?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  onClick?: () => void;
};

const BaseImage = ({
  src,
  alt = '',
  title = '',
  height = 'auto',
  width = 'auto',
  className = '',
  onClick = () => {},
}: BaseImageProps) => {
  const [ref, setRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (ref) {
      ref.onerror = () => {
        ref.src = NoImageSrc;
      };
    }
  }, [ref]);

  return (
    <img
      src={src}
      title={title}
      alt={alt}
      className={`rounded h-full w-auto bg-gray-300 ${className}`}
      style={{
        backgroundImage: `url(${LoadingIndicatorSvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      height={height}
      width={width}
      ref={setRef}
      onClick={onClick}
    />
  );
};

export default BaseImage;
