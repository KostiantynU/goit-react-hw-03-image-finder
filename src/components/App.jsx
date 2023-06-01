import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/';
import { ImageGallery } from './ImageGallery';
import { getImages } from './Services/Api';

export class App extends Component {
  state = {
    arrayOfImages: [],
    page: 1,
    perPage: 12,
  };
  componentDidMount() {
    getImages();
  }
  render() {
    return (
      <section className={css['main-section']}>
        <Searchbar />
        <ImageGallery />
      </section>
    );
  }
}
