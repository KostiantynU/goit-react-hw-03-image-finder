import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/';
import { ImageGallery } from './ImageGallery';
import { getImages } from './Services/Api';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';

export class App extends Component {
  state = {
    arrayOfImages: [],
    page: 1,
    perPage: 12,
    searchQuery: '',
  };

  componentDidMount() {}

  changeSearchQuery = evt => {
    this.setState({ searchQuery: evt.target.value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    const { searchQuery, page, perPage } = this.state;
    const paramsFetch = new URLSearchParams({
      q: searchQuery,
      page: page,
      per_page: perPage,
    });
    // console.log(paramsFetch.toString());
    getImages(paramsFetch.toString()).then(result => {
      console.log(result);
      this.setState({ arrayOfImages: result.hits });
    });
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  loadMore = () => {};

  render() {
    return (
      <section className={css['main-section']}>
        <Searchbar
          searchQuery={this.state.searchQuery}
          changeSearchQuery={this.changeSearchQuery}
          onSubmit={this.onSubmit}
        />
        <ImageGallery arrayOfImages={this.state.arrayOfImages} />
        {this.state.arrayOfImages.length > 0 && <ButtonLoadMore />}
      </section>
    );
  }
}
