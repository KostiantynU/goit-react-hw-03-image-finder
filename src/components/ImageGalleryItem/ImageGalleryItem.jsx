import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export function ImageGalleryItem(props) {
  const { webformatURL, tags, largeImageURL, onClick: showModal } = props;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css['ImageGalleryItem-image']}
        src={webformatURL}
        alt={tags}
        onClick={() => showModal(largeImageURL, tags)}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
