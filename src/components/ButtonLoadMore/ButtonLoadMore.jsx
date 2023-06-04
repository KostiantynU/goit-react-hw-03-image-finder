import React from 'react';
import css from './ButtonLoadMore.module.css';
import PropTypes from 'prop-types';
export function ButtonLoadMore(props) {
  const { onClick: loadMore } = props;

  return (
    <>
      <button className={css['button-load-more']} type="button" onClick={loadMore}>
        Load more
      </button>
    </>
  );
}
ButtonLoadMore.propTypes = { onClick: PropTypes.func.isRequired };
