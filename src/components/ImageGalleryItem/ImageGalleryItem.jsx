import React from 'react';
import css from './ImageGalleryItem.module.css';
export function ImageGalleryItem(props) {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css['ImageGalleryItem-image']} src="" alt="" />
    </li>
  );
}
