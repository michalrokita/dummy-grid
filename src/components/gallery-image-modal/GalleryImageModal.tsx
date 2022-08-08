import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlbumImage } from '../../hooks/useAlbumsImages.hook';
import BaseImage from '../base-image/BaseImage';
import CloseWrapper from '../close-wrapper/CloseWrapper';
import './GalleryImageModal.css';

type GalleryImageModalProps = {
  image: AlbumImage;
  isVisible: boolean;
  onClose: () => void;
};

const GalleryImageModal = ({ image, isVisible, onClose }: GalleryImageModalProps) => {

  useEffect(() => {
    const handleOnKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keyup', handleOnKeyUp);

    return () => {
      window.removeEventListener('keyup', handleOnKeyUp);
    }
  }, [onClose]);

  const modal = (
    <div className="fixed inset-0 z-10 flex flex-col justify-center items-center bg-slate-900/60" role="dialog">
      <div className="relative flex flex-col justify-center items-center w-full h-full p-5">
        <CloseWrapper onClose={onClose}>
          <BaseImage
            src={image.url}
            title={image.title}
            alt={image.title}
            className="max-h-[var(--modal-image-max-height)] max-w-screen"
          />
        </CloseWrapper>
      </div>
    </div>
  );

  return isVisible ? createPortal(modal, document.body) : null;
};

export default GalleryImageModal;
