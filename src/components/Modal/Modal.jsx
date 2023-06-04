import React, { Component } from 'react';
import css from './Modal.module.css';
export class Modal extends Component {
  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModal('');
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.escapeMethod);
  }

  escapeMethod = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal('');
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeMethod);
  }
  render() {
    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.largeImg} alt={this.props.altForImg} />
        </div>
        <button
          type="button"
          className={css['close-button']}
          onClick={() => this.props.closeModal('')}
        >
          <svg id="icon-close_40px" viewBox="0 0 32 32" fill="white">
            <path d="M23.733 10.304l-1.504-1.504-5.963 5.963-5.963-5.963-1.504 1.504 5.963 5.963-5.963 5.963 1.504 1.504 5.963-5.963 5.963 5.963 1.504-1.504-5.963-5.963 5.963-5.963z"></path>
          </svg>
        </button>
      </div>
    );
  }
}
