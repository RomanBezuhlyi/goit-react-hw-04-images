import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Application } from 'components/App';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Bars } from 'react-loader-spinner';
import { Button } from 'components/Button';
import * as imagesApi from 'services/images-api';

import 'react-toastify/dist/ReactToastify.css';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    error: null,
    page: 1,
    totalPages: 1,
    showLoader: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const isSearchQueryUpdated =
      prevState.searchQuery !== this.state.searchQuery;
    const isPageUpdated = prevState.page !== this.state.page;

    if (isSearchQueryUpdated || isPageUpdated) {
      this.setState({ showLoader: true });
      try {
        const result = await imagesApi.fetchImagesBundle({
          query: this.state.searchQuery,
          page: this.state.page,
          perPage: PER_PAGE,
        });
        if (result.totalHits === 0) {
          toast.warning(
            'Sorry, there are no images, corresponding to your request.'
          );
          return;
        }
        if (isSearchQueryUpdated) {
          toast.info(
            `Hooray, we have found ${result.totalHits} images for you.`
          );
          this.setState({ totalPages: Math.ceil(result.totalHits / PER_PAGE) });
        }
        const hits = result.hits.map(element => {
          return {
            id: element.id,
            webformatURL: element.webformatURL,
            tags: element.tags,
            user: element.user,
            largeImageURL: element.largeImageURL,
          };
        });
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(`Error occured ${this.state.error}`);
      } finally {
        this.setState({ showLoader: false });
      }
    }
  }

  setSearchQuery = query => {
    if (this.state.searchQuery === query) {
      return;
    }
    this.setState({ searchQuery: query, images: [], page: 1, totalPages: 1 });
  };

  loadMoreImages = () => {
    const { page, totalPages } = this.state;
    if (page < totalPages) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  setShowLoader = value => {
    this.setState({ showLoader: value });
  };

  render() {
    const { searchQuery, showLoader, images, page, totalPages } = this.state;
    return (
      <Application>
        <Searchbar onSubmit={this.setSearchQuery} />
        {searchQuery && <ImageGallery images={this.state.images} />}
        {showLoader && <Bars color="#00BFFF" height={80} width={80} />}
        {images.length !== 0 && page !== totalPages && (
          <Button onClick={this.loadMoreImages} disabled={showLoader} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </Application>
    );
  }
}
