import { useState } from 'react';
import { AlbumImage } from '../../hooks/useAlbumsImages.hook';
import GalleryImageModal from '../gallery-image-modal/GalleryImageModal';
import BaseImage from '../base-image/BaseImage';

type GalleryImageProps = {
  image: AlbumImage;
  onClick?: () => void;
};

const GalleryImage = ({ image, onClick }: GalleryImageProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => setIsModalVisible(false);
  const handleModalOpen = () => setIsModalVisible(true);

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleModalOpen();
    }
  }

  return (
    <>
      <GalleryImageModal image={image} isVisible={isModalVisible} onClose={handleModalClose} />
      <picture
        data-title={image.title}
        className="
          gallery-image-wrapper before:hidden hover:before:block before:content-[attr(data-title)]
          before:absolute before:bottom-0 before:text-xs before:p-2 before:leading-none before:text-white
        before:bg-slate-900 before:rounded-b before:w-full before:max-h-full"
        onClick={handleModalOpen}
        onKeyUp={handleOnKeyUp}
        tabIndex={0}
      >
        <BaseImage
          src={image.thumbnailUrl}
          title={image.title}
          alt={image.title}
          height={150}
          width={150}
          onClick={onClick}
        />
      </picture>
    </>
  );
};

export default GalleryImage;
