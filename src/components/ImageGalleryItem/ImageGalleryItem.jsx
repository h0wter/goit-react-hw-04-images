import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryCard, ImageGalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ImageGalleryCard>
        <ImageGalleryImage
          onClick={toggleModal}
          src={imageData.webformatURL}
          alt={imageData.tags}
        />
      </ImageGalleryCard>

      {isModalOpen && (
        <Modal
          src={imageData.largeImageURL}
          alt={imageData.tags}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
