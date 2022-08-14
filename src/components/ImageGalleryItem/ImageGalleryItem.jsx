import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageUrl, largeImageUrl, tags, author }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(show => !show);
  };

  const imageAlt = `${tags}. Author: ${author}`;

  return (
    <GalleryItem onClick={toggleModal}>
      <GalleryItemImage src={imageUrl} alt={imageAlt} />
      {showModal && (
        <Modal
          imageUrl={largeImageUrl}
          imageAlt={imageAlt}
          onClose={toggleModal}
        />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
