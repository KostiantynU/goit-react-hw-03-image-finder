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
    searchQueryForFetch: '',
    isScrollTrue: false,
  };

  componentDidMount() {}

  componentDidUpdate(_, prevState) {
    if (this.state.isScrollTrue) {
      this.scrollOnTwoCards();
    }
  }

  changeSearchQuery = evt => {
    this.setState({ searchQuery: evt.target.value, isScrollTrue: false });
  };

  onSubmit = async evt => {
    evt.preventDefault();

    const { searchQuery, searchQueryForFetch, perPage } = this.state;

    if (searchQuery !== searchQueryForFetch) {
      await this.resetState();
    }
    const paramsFetch = new URLSearchParams({
      q: searchQuery,
      page: this.state.page,
      per_page: perPage,
    });
    getImages(paramsFetch.toString()).then(result => {
      console.log(result);
      if (!result.hits.length) {
        return alert('Nothing to show');
      }
      this.setState(prevState => {
        return {
          arrayOfImages: [...prevState.arrayOfImages, ...result.hits],
          page: prevState.page + 1,
          searchQueryForFetch: searchQuery,
          isScrollTrue: true,
        };
      });
    });
  };

  resetState = () => {
    this.setState({ page: 1, arrayOfImages: [], isScrollTrue: false });
  };

  loadMore = async () => {
    const { searchQueryForFetch, page, perPage } = this.state;

    const paramsFetch = new URLSearchParams({
      q: searchQueryForFetch,
      page: page,
      per_page: perPage,
    });
    getImages(paramsFetch.toString()).then(async result => {
      await this.setState(prevState => {
        return {
          arrayOfImages: [...prevState.arrayOfImages, ...result.hits],
          page: prevState.page + 1,
        };
      });
    });
  };

  scrollOnTwoCards = () => {
    console.log('scroll2cards');
    if (document.getElementById('ImageGallery') === null) {
      return console.log('null');
    }
    const { height: cardHeight } = document
      .getElementById('ImageGallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    // this.setState({ isScrollTrue: false });
  };

  render() {
    return (
      <section className={css['main-section']}>
        <Searchbar
          searchQuery={this.state.searchQuery}
          changeSearchQuery={this.changeSearchQuery}
          onSubmit={this.onSubmit}
        />
        <ImageGallery arrayOfImages={this.state.arrayOfImages} />
        {this.state.arrayOfImages.length > 0 && <ButtonLoadMore onClick={this.loadMore} />}
      </section>
    );
  }
}
