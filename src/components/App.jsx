import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/';
import { ImageGallery } from './ImageGallery';
import { getImages } from './Services/Api';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';
import { Modal } from './Modal';
import { Grid } from 'react-loader-spinner';
export class App extends Component {
  state = {
    arrayOfImages: [],
    page: 1,
    perPage: 12,
    searchQuery: '',
    searchQueryForFetch: '',
    showBtn: false,
    isScrollTrue: false,
    altForImg: '',
    largeImg: '',
    isLoader: false,
    isError: '',
  };

  componentDidUpdate() {
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
    this.setState({ isLoader: true });
    getImages(paramsFetch.toString())
      .then(result => {
        if (!result.hits.length) {
          return alert('Nothing to show');
        }
        this.setState(prevState => {
          return {
            arrayOfImages: [...prevState.arrayOfImages, ...result.hits],
            page: prevState.page + 1,
            searchQueryForFetch: searchQuery,
            showBtn: this.state.page < Math.ceil(result.totalHits / 12),
            isScrollTrue: true,
          };
        });
      })
      .catch(error => {
        this.setState({ isError: error.message });
      })
      .finally(() => {
        this.setState({ isLoader: false });
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
          isScrollTrue: true,
          showBtn: this.state.page < Math.ceil(result.totalHits / 12),
        };
      });
    });
  };

  scrollOnTwoCards = () => {
    const { height: cardHeight } = document
      .getElementById('ImageGallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  showModal = (link, tags) =>
    this.setState({ largeImg: link, altForImg: tags, isScrollTrue: false });

  render() {
    const { searchQuery, isLoader, arrayOfImages, showBtn, isError, largeImg, altForImg } =
      this.state;
    return (
      <section className={css['main-section']}>
        <Searchbar
          searchQuery={searchQuery}
          changeSearchQuery={this.changeSearchQuery}
          onSubmit={this.onSubmit}
        />
        {isLoader && (
          <Grid
            height="100"
            width="100"
            color="#3f51b5"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
            wrapperClass=""
            visible={true}
          />
        )}
        <ImageGallery arrayOfImages={arrayOfImages} showModal={this.showModal} />
        {showBtn && <ButtonLoadMore onClick={this.loadMore} />}
        {isError && <h2 style={{ textAlign: 'center' }}>Sorry. {isError}😭</h2>}
        {largeImg && (
          <Modal largeImg={largeImg} closeModal={this.showModal} altForImg={altForImg} />
        )}
      </section>
    );
  }
}
