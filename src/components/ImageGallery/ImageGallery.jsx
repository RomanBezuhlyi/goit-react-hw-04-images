import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryContainer } from '.';

export function ImageGallery({ images }) {
  return (
    <ImageGalleryContainer>
      {images.length !== 0 &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              imageUrl={image.webformatURL}
              largeImageUrl={image.largeImageURL}
              tags={image.tags}
              author={image.user}
            />
          );
        })}
    </ImageGalleryContainer>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
