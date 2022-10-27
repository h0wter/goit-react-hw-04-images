import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data }) => {
  return (
    <ImageGalleryList>
      {data.map(el => {
        return <ImageGalleryItem imageData={el} key={el.webformatURL} />;
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
