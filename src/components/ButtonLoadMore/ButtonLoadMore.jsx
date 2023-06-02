import React from 'react';
import css from './ButtonLoadMore.module.css';
export function ButtonLoadMore(props) {
  return (
    <>
      <button className={css['button-load-more']} type="button">
        Load more
      </button>
    </>
  );
}
