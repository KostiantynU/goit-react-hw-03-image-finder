import React from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export function Searchbar(props) {
  const { onSubmit } = props;
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={evt => onSubmit(evt)}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
