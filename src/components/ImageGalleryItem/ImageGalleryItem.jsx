import React from 'react';
import css from './ImageGalleryItem.module.css';
export function ImageGalleryItem(props) {
  const { webformatURL, largeImageURL, tags } = props;
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css['ImageGalleryItem-image']} src={webformatURL} alt={tags} />
    </li>
  );
}
