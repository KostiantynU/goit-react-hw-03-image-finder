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
    showBtn: false,
    altForImg: '',
    largeImg: '',
    isLoader: false,
    isError: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      const { searchQuery, perPage, page } = this.state;
      const paramsFetch = new URLSearchParams({
        q: searchQuery,
        page: page,
        per_page: perPage,
      });
      this.setState({ isLoader: true });
      getImages(paramsFetch.toString())
        .then(result => {
          if (!result.hits.length) {
            return this.setState({ isError: 'Ssory, no matches found' });
          }
          this.setState({
            arrayOfImages: [...prevState.arrayOfImages, ...result.hits],
            showBtn: this.state.page < Math.ceil(result.totalHits / 12),
          });
        })
        .catch(error => {
          this.setState({ isError: error.message });
        })
        .finally(() => {
          this.setState({ isLoader: false });
          this.scrollOnTwoCards();
        });
    }
  }

  onSubmit = value => {
    this.setState({ searchQuery: value, page: 1, isError: '' });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
    const { isLoader, arrayOfImages, showBtn, isError, largeImg, altForImg } = this.state;
    return (
      <section className={css['main-section']}>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoader && (
          <Grid
            height="100"
            width="100"
            color="#3f51b5"
            ariaLabel="grid-loading"
            radius="12"
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
