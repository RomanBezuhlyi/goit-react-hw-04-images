import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { imageUrl, tags, largeImageUrl, author } = this.props;
    const { showModal } = this.state;
    const imageAlt = `${tags}. Author: ${author}`;

    return (
      <GalleryItem onClick={this.toggleModal}>
        <GalleryItemImage src={imageUrl} alt={imageAlt} />
        {showModal && (
          <Modal
            imageUrl={largeImageUrl}
            imageAlt={imageAlt}
            onClose={this.toggleModal}
          />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
