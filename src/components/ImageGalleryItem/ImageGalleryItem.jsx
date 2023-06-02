import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export function ImageGalleryItem(props) {
  const { webformatURL, largeImageURL, tags } = props;
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css['ImageGalleryItem-image']} src={webformatURL} alt={tags} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
