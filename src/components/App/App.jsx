import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Application } from 'components/App';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Bars } from 'react-loader-spinner';
import { Button } from 'components/Button';
import * as imagesApi from 'services/images-api';

import 'react-toastify/dist/ReactToastify.css';

const PER_PAGE = 12;

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const isSearchQueryUpdated = useRef(false);
  const isLoadMoreButtonVisible = page !== totalPages && !showLoader;

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setShowLoader(true);

    imagesApi
      .fetchImagesBundle({
        query: searchQuery,
        page: page,
        perPage: PER_PAGE,
      })
      .then(result => {
        if (result.totalHits === 0) {
          toast.warning(
            'Sorry, there are no images, corresponding to your request.'
          );
          return;
        }
        if (isSearchQueryUpdated.current) {
          toast.info(
            `Hooray, we have found ${result.totalHits} images for you.`
          );
          setTotalPages(Math.ceil(result.totalHits / PER_PAGE));
          isSearchQueryUpdated.current = false;
        }
        const newImages = result.hits.map(element => {
          return {
            id: element.id,
            webformatURL: element.webformatURL,
            tags: element.tags,
            user: element.user,
            largeImageURL: element.largeImageURL,
          };
        });
        setImages(prevImages => [...prevImages, ...newImages]);
      })
      .catch(({ message }) => {
        toast.error(`Error occured ${message}`);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [searchQuery, page]);

  const setNewSearchQuery = query => {
    if (searchQuery === query) {
      return;
    }
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setTotalPages(1);
    isSearchQueryUpdated.current = true;
  };

  const loadMoreImages = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Application>
      <Searchbar onSubmit={setNewSearchQuery} />
      {images.length !== 0 && <ImageGallery images={images} />}
      {showLoader && <Bars color="#00BFFF" height={80} width={80} />}
      {isLoadMoreButtonVisible && (
        <Button onClick={loadMoreImages} disabled={showLoader} />
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </Application>
  );
};
