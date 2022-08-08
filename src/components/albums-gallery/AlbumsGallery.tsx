import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { ItemCallback, Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { AlbumImage } from '../../hooks/useAlbumsImages.hook';
import '../../../node_modules/react-grid-layout/css/styles.css';
import './AlbumsGallery.css';
import CloseWrapper from '../close-wrapper/CloseWrapper';
import GalleryImage from '../gallery-image/GalleryImage';

type AlbumsGalleryProps = {
  images: AlbumImage[];
  onRemoveImage?: (imageId: number) => void;
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const AlbumsGallery = ({ images, onRemoveImage }: AlbumsGalleryProps) => {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [currentlyDragged, setCurrentlyDragged] = useState<Layout | null>(null);
  const [shouldBlockClickPropagation, setShouldBlockClickPropagation] = useState(false);

  useEffect(() => {
    const newLayout = images.map((image, index) => ({
      i: image.id.toString(),
      x: index % 4,
      y: Math.floor(index / 4),
      w: 1,
      h: 1,
      isResizable: false,
      isBounded: true,
    }));

    setLayout(newLayout);
  }, [images]);

  const handleLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      const maxCols = 4;
      const maxRows = Math.ceil(images.length / maxCols);

      if (!currentLayout.length) {
        return;
      }

      const fixedCurrentLayout = currentLayout.map((currentLayoutItem) => {
        const clonedLayoutItem = { ...currentLayoutItem };

        if (
          clonedLayoutItem.y > maxRows - 1 &&
          clonedLayoutItem.x < maxCols - 1
        ) {
          clonedLayoutItem.x++;
          clonedLayoutItem.y = 0;
        }

        if (
          clonedLayoutItem.y > maxRows - 1 &&
          clonedLayoutItem.x >= maxCols - 1 &&
          currentlyDragged !== null
        ) {
          clonedLayoutItem.y = currentlyDragged.y;
          clonedLayoutItem.x = currentlyDragged.x;
        }

        return {
          ...clonedLayoutItem,
          isResizable: false,
          isBounded: true,
        };
      });

      setLayout(fixedCurrentLayout);
    },
    [currentlyDragged, images]
  );

  const createHandleRemoveImage = (imageId: number) => {
    return () => {
      const newLayout = layout.filter(
        (layoutItem) => layoutItem.i !== imageId.toString()
      );
      onRemoveImage && onRemoveImage(imageId);
      setLayout(newLayout);
    };
  };

  const handleOnDragStart: ItemCallback = ([, oldItem]) => {
    setCurrentlyDragged(oldItem);
  };

  const handleOnDragStop = () => {
    setCurrentlyDragged(null);
    setShouldBlockClickPropagation(true);
    setTimeout(() => {
      setShouldBlockClickPropagation(false);
    })
  }

  /**
   * We don't want the click event to be progagated if the user is dragging an image.
   * @param event - The event that is triggered when the user clicks on the image container.
   */
  const handleOnClickCapture = (event: SyntheticEvent) => {
    shouldBlockClickPropagation && event.stopPropagation();
  };

  return (
    <div
      className="overflow-hidden"
      style={{ height: Math.ceil(images.length / 4) * 165 }}
    >
      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
        rowHeight={150}
        width={150 * 4}
        maxRows={3}
        onLayoutChange={handleLayoutChange}
        onDragStart={handleOnDragStart}
        onDragStop={handleOnDragStop}
        className="grid-layout"
      >
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className="flex justify-center cursor-move"
              onClickCapture={handleOnClickCapture}
            >
              <CloseWrapper onClose={createHandleRemoveImage(image.id)}>
                <GalleryImage image={image} />
              </CloseWrapper>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default AlbumsGallery;
