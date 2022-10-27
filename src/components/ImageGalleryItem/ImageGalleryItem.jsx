import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryCard, ImageGalleryImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
  };

  render() {
    const { imageData } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <ImageGalleryCard>
          <ImageGalleryImage
            onClick={this.toggleModal}
            src={imageData.webformatURL}
            alt={imageData.tags}
          />
        </ImageGalleryCard>

        {isModalOpen && (
          <Modal
            src={imageData.largeImageURL}
            alt={imageData.tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
