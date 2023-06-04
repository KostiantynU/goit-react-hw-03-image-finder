import React from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
export function ImageGallery(props) {
  const { arrayOfImages } = props;
  return (
    <ul className={css.ImageGallery} id={`ImageGallery`}>
      {arrayOfImages.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  arrayOfImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
